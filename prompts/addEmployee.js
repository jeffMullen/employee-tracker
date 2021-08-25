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
            message: 'Who is the emplyee\'s manager?',
            name: 'manager'
        }
    ];

    inquirer
        .prompt(employee)
        .then(response => {
            console.log(response);
            const { firstName, lastName, employeeRole, manager } = response;
            // First name, Last name, Role(From role table[logic here]), manager

        })
}

module.exports = addEmployee;