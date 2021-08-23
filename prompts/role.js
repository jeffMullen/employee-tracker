const inquirer = require('inquirer');

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

const addRole = () => {
    inquirer
        .prompt(role)
        .then(response => {
            console.log(response);
        })
}

module.exports = addRole;