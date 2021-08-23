const inquirer = require('inquirer');
const addDepartment = require('./department');
const addRole = require('./role');
const addEmployee = require('./employee');
const viewDepartments = require('./viewDepartments');

const menu = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
        name: 'menu'
    }
];

const mainMenu = () => {
    inquirer
        .prompt(menu)
        .then(response => {
            console.log(response);
            if (response.menu === 'View all departments') {
                viewDepartments();
            } else if (response.menu === 'Add a department') {
                addDepartment();
            } else if (response.menu === 'Add a role') {
                addRole();
            } else if (response.menu === 'Add an employee') {
                addEmployee();
            }
        })
};

module.exports = mainMenu;