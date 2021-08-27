const inquirer = require('inquirer');
// const addDepartment = require('./addDepartment');
// const addRole = require('./addRole');
// const addEmployee = require('./addEmployee');
// const updateEmployee = require('./updateEmployee');
const tables = require('./viewTables');
const employeesDB = require('../db/employeesDB');



const menu = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
        name: 'menu'
    }
];

// Main menu inquirer prompt
const mainMenu = () => {
    inquirer
        .prompt(menu)
        .then(response => {
            console.log(response);
            if (response.menu === 'View all departments') {
                viewDepartments();
                // mainMenu();
            } else if (response.menu === 'View all roles') {
                viewRoles();
            } else if (response.menu === 'View all employees') {
                viewEmployees();
            } else if (response.menu === 'Add a department') {
                addDepartment();
            } else if (response.menu === 'Add a role') {
                addRole();
            } else if (response.menu === 'Add an employee') {
                addEmployee();
            } else if (response.menu === 'Update an employee role') {
                updateEmployee();
            }
        })
};

const viewDepartments = () => {
    employeesDB.viewingDepartments().then(results => {

        console.table(results[0])
        mainMenu();

    });
}

const viewRoles = () => {
    employeesDB.viewingRoles().then(results => {
        console.table(results[0])
        mainMenu();
    });
};

const viewEmployees = () => {
    employeesDB.viewingEmployees().then(results => {
        console.table(results[0])
        mainMenu();
    });
}

const department = [
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'department'
    }
];

// ADD DEPARTMENT
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

// ADD EMPLOYEE
const addEmployee = () => {
    // Getting an array of roles to use in the prompt
    employeesDB.getRoles().then(data => {
        const roleChoices = data[0];
        let roleArray = [];
        for (let i = 0; i < roleChoices.length; i++) {
            roleArray.push(roleChoices[i].title);
        }
        employeePrompt(roleArray);
    })
};

// Inquirer prompt
const employeePrompt = (roleArray) => {
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
            type: 'list',
            message: 'What is the employee\'s role?',
            choices: roleArray,
            name: 'employeeRole'
        },
        {
            type: 'input',
            message: 'Who is the employee\'s manager? Enter id:\n Leave blank if the employee has no manager:',
            name: 'manager'
        }
    ];

    inquirer
        .prompt(employee)
        .then(response => {
            convertRoleId(response);
        })
}

// Converting role name into a role id to be entered into the employee table
const convertRoleId = (response) => {
    let { firstName, lastName, employeeRole, manager } = response;
    let roleId;

    employeesDB.viewingRoles().then(data => {
        let newData = data[0];
        for (let i = 0; i < newData.length; i++) {
            if (employeeRole === newData[i].Title) {
                roleId = newData[i].Id;
                break;
            }
        }
        checkEmployeeIds(firstName, lastName, roleId, manager);
    })
}

// If manager !== a current employee id, set manager id to null
const checkEmployeeIds = (firstName, lastName, roleId, manager) => {
    employeesDB.getEmployeeId().then(data => {
        const employees = data[0].map(id => {
            return id.id;
        });
        if (employees.includes(parseInt(manager)) === false) {
            manager = null;
        };
        finalEntry(firstName, lastName, roleId, manager);
    })
}

// Sending all processed employee data to the database
const finalEntry = (firstName, lastName, roleId, manager) => {
    employeesDB.addingEmployee(firstName, lastName, roleId, manager).then(results => {
        if (results[0].affectedRows) {
            console.log('Employee added!');
        }
    })
}

// ADD ROLE
const addRole = () => {
    // Getting department names to use as prompt choices
    employeesDB.getDepartments().then(data => {
        const departmentChoices = data[0];
        rolePrompt(departmentChoices);
    })
}

// Inquirer prompt
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
            convertDepartment(response);
        })
}

// Converting department name into department id
const convertDepartment = (response) => {
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
        finalEntryRole(role, salary, departmentId);

    })
}

// Adding role to database
const finalEntryRole = (role, salary, departmentId) => {
    employeesDB.addingRole(role, salary, departmentId).then(data => {
        if (data[0].affectedRows) {
            console.log('Role added!');
        }
    });
}

// UPDATE EMPLOYEE
const updateEmployee = () => {
    // Getting employee names to use in prompt choices
    employeesDB.getEmployees().then(data => {
        const employees = data[0];
        let employeeChoices = [];
        for (let i = 0; i < employees.length; i++) {
            employeeChoices.push(`${employees[i].first_name} ${employees[i].last_name}`);
        }
        gettingRoles(employeeChoices);
    })
}

// Getting roles to use in prompt choices
const gettingRoles = (employeeChoices) => {
    employeesDB.getRoles().then(data => {
        const roleChoices = data[0];
        let roleArray = [];
        for (let i = 0; i < roleChoices.length; i++) {
            roleArray.push(roleChoices[i].title);
        }
        updatePrompt(employeeChoices, roleArray);
    })
}

// Inquirer prompt
const updatePrompt = (employeeChoices, roleArray) => {
    const updatingEmployee = [
        {
            type: 'list',
            message: 'Which employee\'s role do you want to update?',
            choices: employeeChoices,
            name: 'employee'
        },
        {
            type: 'list',
            message: 'Which role do you want to assign the selected employee?',
            choices: roleArray,
            name: 'role'
        }
    ]

    inquirer
        .prompt(updatingEmployee)
        .then(response => {
            convertEmployeeId(response);
        })
}

// Converting employee name into employee id
const convertEmployeeId = (response) => {
    let { employee, role } = response;
    employee = employee.split(' ');

    let employeeId;
    employeesDB.getEmployeeId().then(data => {
        const employees = data[0];
        for (let i = 0; i < employees.length; i++) {
            if (employee[0] === employees[i].first_name && employee[1] === employees[i].last_name) {
                employeeId = employees[i].id;
            }
        }

        convertRoleIdUpdate(employeeId, role);
    })
}

// Converting role name into role id
const convertRoleIdUpdate = (employeeId, role) => {
    let roleId;
    employeesDB.getRoleId().then(data => {
        const roles = data[0];
        for (let i = 0; i < roles.length; i++) {
            if (role === roles[i].title) {
                roleId = roles[i].id;
            }
        }
        finalQuery(employeeId, roleId);
    })
}

// Updating employee role
const finalQuery = (employeeId, roleId) => {
    employeesDB.updatingEmployee(employeeId, roleId).then(results => {
        if (results[0].affectedRows) {
            console.log('Employee updated!');
        };
    })
}


module.exports = mainMenu;