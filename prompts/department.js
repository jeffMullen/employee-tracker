const inquirer = require('inquirer');

const department = [
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'department'
    }
];

const addDepartment = () => {
    inquirer
        .prompt(department)
        .then(response => {
            console.log(response);
        })
};

module.exports = addDepartment;