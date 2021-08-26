const inquirer = require('inquirer');
const addDepartment = require('./addDepartment');
const addRole = require('./addRole');
const addEmployee = require('./addEmployee');
const updateEmployee = require('./updateEmployee');
const tables = require('./viewTables');


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
                tables.viewDepartments();
            } else if (response.menu === 'View all roles') {
                tables.viewRoles();
            } else if (response.menu === 'View all employees') {
                tables.viewEmployees();
            } else if (response.menu === 'Add a department') {
                addDepartment();
            } else if (response.menu === 'Add a role') {
                addRole();
            } else if (response.menu === 'Add an employee') {
                addEmployee();
            } else if (response.menu === 'Update an employee role') {
                updateEmployee();
            }
        })
};

module.exports = mainMenu;