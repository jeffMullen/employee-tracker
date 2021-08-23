const inquirer = require('inquirer');

const menu = [
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
        // List departments and corresponding ids so it's easy to see what exists
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
];

const mainMenu = () => {
    inquirer
        .prompt(menu)
        .then(response => {
            console.log(response);
            if (response.menu === 'Add a department') {
                addDepartment();
            }
        })
};

const addDepartment = () => {
    inquirer
        .prompt(department)
        .then(response => {
            console.log(response);
        })
};


module.exports = {
    mainMenu
}