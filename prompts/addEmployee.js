const inquirer = require('inquirer');
const employeesDB = require('../db/employeesDB');

const addEmployee = () => {
    employeesDB.getRoles().then(data => {
        const roleChoices = data[0];
        let roleArray = [];
        for (let i = 0; i < roleChoices.length; i++) {
            roleArray.push(roleChoices[i].title);
        }
        console.log(roleArray);
        employeePrompt(roleArray);
    })
};

const employeePrompt = (roleArray) => {
    console.log(roleArray);
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
            message: 'Who is the employee\'s manager?',
            name: 'manager'
        }
    ];

    inquirer
        .prompt(employee)
        .then(response => {
            console.log(response);
            const { firstName, lastName, employeeRole, manager } = response;
            // First name, Last name, Role(From role table[logic here]), manager
            let roleId;
            employeesDB.viewingRoles().then(data => {
                console.log(`DATA ${data}`);
                let newData = data[0];
                console.log(`NEW DATA ${newData}`);
                for (let i = 0; i < newData.length; i++) {
                    if (employeeRole === newData[i].Title) {
                        roleId = newData[i].Id;
                        break;
                    }
                }

                console.log(roleId);
                getManager(firstName, lastName, roleId, manager);
            })
        })
}

const getManager = (firstName, lastName, roleId, manager) => {
    let managerId;
    employeesDB.viewingEmployees().then(results => {
        console.log(results[0]);
        let newResults = results[0];
        for (let i = 0; i < newResults.length; i++) {
            if (manager === `${newResults[i].First} ${newResults[i].Last}`) {
                managerId = newResults[i].Id;
            }
        }
        console.log(managerId);
        finalEntry(firstName, lastName, roleId, managerId);
    })

}

const finalEntry = (firstName, lastName, roleId, managerId) => {
    console.log(roleId);
    console.log(managerId);
    employeesDB.addingEmployee(firstName, lastName, roleId, managerId).then(results => {
        if (results[0].affectedRows) {
            console.log('Employee added!');
        }
    })
}

module.exports = addEmployee;