const inquirer = require('inquirer');

const mainMenu = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
        name: 'menu'
    }
];

const department = [
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'department'
    }
];

const role = [
    {
        type: 'input',
        message: 'What is the name of the role?',
        name: 'role'
    },
    {
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'salary'
    },
    {
        type: 'input',
        message: 'Which department does this role belong to?',
        name: 'departmentRole'
        // Add validation to only allow current departments
    }
];

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
]