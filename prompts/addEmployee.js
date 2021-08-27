const inquirer = require('inquirer');
const employeesDB = require('../db/employeesDB');

const addEmployee = () => {
    // Getting an array of roles to use in the prompt
    employeesDB.getRoles().then(data => {
        const roleChoices = data[0];
        let roleArray = [];
        for (let i = 0; i < roleChoices.length; i++) {
            roleArray.push(roleChoices[i].title);
        }
        employeePrompt(roleArray);
    })
};

const employeePrompt = (roleArray) => {
    const employee = [
        {
            type: 'input',
            message: 'What is the employee\'s first name?',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'What is the employee\'s last name?',
            name: 'lastName'
        },
        {
            type: 'list',
            message: 'What is the employee\'s role?',
            choices: roleArray,
            name: 'employeeRole'
        },
        {
            type: 'input',
            message: 'Who is the employee\'s manager? Enter Id:',
            name: 'manager'
        }
    ];

    inquirer
        .prompt(employee)
        .then(response => {
            convertRoleId(response);
        })
}

// Converting role name into a role id to be entered into the employee table
const convertRoleId = (response) => {
    const { firstName, lastName, employeeRole, manager } = response;
    let roleId;
    employeesDB.viewingRoles().then(data => {
        let newData = data[0];
        for (let i = 0; i < newData.length; i++) {
            if (employeeRole === newData[i].Title) {
                roleId = newData[i].Id;
                break;
            }
        }
        finalEntry(firstName, lastName, roleId, manager);
    })
}

// Sending all processed data to the database query.  Then printing employee table
const finalEntry = (firstName, lastName, roleId, manager) => {
    employeesDB.addingEmployee(firstName, lastName, roleId, manager).then(results => {
        if (results[0].affectedRows) {
            console.log('Employee added!');
        }
    })
}

module.exports = addEmployee;