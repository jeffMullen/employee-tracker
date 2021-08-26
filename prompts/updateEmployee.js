const inquirer = require('inquirer');
const employeesDB = require('../db/employeesDB');

const updateEmployee = () => {
    employeesDB.getEmployees().then(data => {
        const employees = data[0];
        let employeeChoices = [];
        for (let i = 0; i < employees.length; i++) {
            employeeChoices.push(`${employees[i].first_name} ${employees[i].last_name}`);
        }
        console.log(employeeChoices);

        employeesDB.getRoles().then(data => {
            const roleChoices = data[0];
            let roleArray = [];
            for (let i = 0; i < roleChoices.length; i++) {
                roleArray.push(roleChoices[i].title);
            }
            console.log(roleArray);
            // updatePrompt(roleArray);
        })


    })
}

module.exports = updateEmployee;