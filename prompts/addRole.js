const inquirer = require('inquirer');
const employeesDB = require('../db/employeesDB');

const addRole = () => {
    employeesDB.getDepartments().then(data => {
        const departmentChoices = data[0];
        rolePrompt(departmentChoices);
    })
}

const rolePrompt = (departmentChoices) => {
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
            type: 'list',
            message: 'Which department does this role belong to?',
            choices: departmentChoices,
            name: 'department'
        }
    ];

    inquirer
        .prompt(role)
        .then(response => {
            const { role, salary, department } = response;
            let departmentId;

            employeesDB.viewingDepartments().then(data => {
                let newData = data[0];
                for (let i = 0; i < newData.length; i++) {
                    if (department === newData[i].Department) {
                        departmentId = newData[i].Id;
                        break;
                    }
                }
                finalEntry(role, salary, departmentId);

            })
        })
}


const finalEntry = (role, salary, departmentId) => {
    employeesDB.addingRole(role, salary, departmentId).then(data => {
        if (data[0].affectedRows) {
            console.log('Role added!');
        }
    });
}

module.exports = addRole;