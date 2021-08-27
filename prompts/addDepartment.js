const inquirer = require('inquirer');
const employeesDB = require('../db/employeesDB');

const department = [
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'department'
    }
];

// Inquirer prompt
const addDepartment = () => {
    inquirer
        .prompt(department)
        .then(response => {
            const name = response.department;

            // Adding department to the database
            employeesDB.addingDepartment(name).then(data => {
                if (data[0].affectedRows) {
                    console.log('Department added!');
                }
            })
        })
};

module.exports = addDepartment;