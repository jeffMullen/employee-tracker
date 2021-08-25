const inquirer = require('inquirer');
const tools = require('../config/connection');

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
            tools.db.query(`INSERT INTO department(name)
            VALUES (?)`, response.department, (err) => {
                err
                    ? console.log(err)
                    : console.log('Department added!')
            })
        })
};

module.exports = addDepartment;