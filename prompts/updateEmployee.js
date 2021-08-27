const inquirer = require('inquirer');
const employeesDB = require('../db/employeesDB');

const updateEmployee = () => {
    // Getting employee names to use in prompt choices
    employeesDB.getEmployees().then(data => {
        const employees = data[0];
        let employeeChoices = [];
        for (let i = 0; i < employees.length; i++) {
            employeeChoices.push(`${employees[i].first_name} ${employees[i].last_name}`);
        }
        gettingRoles(employeeChoices);
    })
}

// Getting roles to use in prompt choices
const gettingRoles = (employeeChoices) => {
    employeesDB.getRoles().then(data => {
        const roleChoices = data[0];
        let roleArray = [];
        for (let i = 0; i < roleChoices.length; i++) {
            roleArray.push(roleChoices[i].title);
        }
        updatePrompt(employeeChoices, roleArray);
    })
}

// Inquirer prompt
const updatePrompt = (employeeChoices, roleArray) => {
    const updatingEmployee = [
        {
            type: 'list',
            message: 'Which employee\'s role do you want to update?',
            choices: employeeChoices,
            name: 'employee'
        },
        {
            type: 'list',
            message: 'Which role do you want to assign the selected employee?',
            choices: roleArray,
            name: 'role'
        }
    ]

    inquirer
        .prompt(updatingEmployee)
        .then(response => {
            convertEmployeeId(response);
        })
}

// Converting employee name into employee id
const convertEmployeeId = (response) => {
    let { employee, role } = response;
    employee = employee.split(' ');

    let employeeId;
    employeesDB.getEmployeeId().then(data => {
        const employees = data[0];
        for (let i = 0; i < employees.length; i++) {
            if (employee[0] === employees[i].first_name && employee[1] === employees[i].last_name) {
                employeeId = employees[i].id;
            }
        }

        convertRoleId(employeeId, role);
    })
}

// Converting role name into role id
const convertRoleId = (employeeId, role) => {
    let roleId;
    employeesDB.getRoleId().then(data => {
        const roles = data[0];
        for (let i = 0; i < roles.length; i++) {
            if (role === roles[i].title) {
                roleId = roles[i].id;
            }
        }
        finalQuery(employeeId, roleId);
    })
}

// Updating employee role
const finalQuery = (employeeId, roleId) => {
    employeesDB.updatingEmployee(employeeId, roleId).then(results => {
        if (results[0].affectedRows) {
            console.log('Employee updated!');
        };
    })
}


module.exports = updateEmployee;