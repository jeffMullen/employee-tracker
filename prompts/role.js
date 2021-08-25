const inquirer = require('inquirer');
const employeesDB = require('../db/employeeDB');

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
            console.log(response);
            const { role, salary, department } = response;

            let departmentId;

            employeesDB.parsingRoleDepartment(response).then(data => {
                console.log(data[0][0].name);
                console.log('HITTING THIS FUNCION')
                console.log(`Department: ${department}`);
                for (let i = 0; i < data.length; i++) {
                    if (department === data[0][i].name) {
                        console.log('INSIDE THE LOOP')
                        departmentId = data[0][i].id;
                    }
                }
                console.log(departmentId);
                // console.log(departmentId);
                // employeesDB.addRole(role, salary, department).then(console.log('GOT TO THE END'));
                // if (data[0].affectedRows) {
                //     console.log('Role added!');
                // }
            })
        })
}

module.exports = addRole;