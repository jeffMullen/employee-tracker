const inquirer = require('inquirer');

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
        type: 'input',
        message: 'What is the employee\'s role?',
        name: 'employeeRole'
    },
    {
        type: 'input',
        message: 'Who is the emplyee\'s manager?',
        name: 'manager'
    }
];

const addEmployee = () => {
    inquirer
        .prompt(employee)
        .then(response => {
            console.log(response);
        })
};

module.exports = addEmployee;