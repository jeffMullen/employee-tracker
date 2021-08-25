const inquirer = require('inquirer');
const employeesDB = require('../db/employeeDB');

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
            const name = response.department;

            employeesDB.addingDepartment(name).then(data => {
                if (data[0].affectedRows) {
                    console.log('Department added!');
                }
            })
        })
};

module.exports = addDepartment;