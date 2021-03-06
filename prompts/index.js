const inquirer = require('inquirer');
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
            if (response.menu === 'View all departments') {
                viewDepartments();
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

// VIEW DEPARTMENTS TABLE
const viewDepartments = () => {
    employeesDB.viewingDepartments().then(results => {
        console.log('\n');
        console.table(results[0])
        mainMenu();
    });
}

// VIEW ROLES TABLE
const viewRoles = () => {
    employeesDB.viewingRoles().then(results => {
        console.log('\n');
        console.table(results[0])
        mainMenu();
    });
};

// VIEW EMPLOYEES TABLE
const viewEmployees = () => {
    employeesDB.viewingEmployees().then(results => {
        console.log('\n');
        console.table(results[0])
        mainMenu();
    });
}

// ADD DEPARTMENT
const department = [
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'department'
    }
];

// Department prompt
const addDepartment = () => {
    inquirer
        .prompt(department)
        .then(response => {
            const name = response.department;

            // Adding department to the database
            employeesDB.addingDepartment(name).then(data => {
                if (data[0].affectedRows) {
                    console.log('\n');
                    console.log('Department added!');
                    console.log('\n');
                }
                mainMenu();
            })
        })
};


// ADD EMPLOYEE
const addEmployee = () => {
    // Getting an array of roles to use in the prompt
    employeesDB.viewingRoles().then(data => {
        const roleChoices = data[0].map(role => ({
            name: role.Title,
            value: role.Id
        }));
        employeePrompt(roleChoices);
    })
};

// Employee prompt
const employeePrompt = (roleChoices) => {
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
            choices: roleChoices,
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
            checkEmployeeIds(response, roleChoices);
        })
}

// If manager !== a current employee id, set manager id to null
const checkEmployeeIds = ({ firstName, lastName, employeeRole, manager }, roleChoices) => {
    const employees = roleChoices.map(id => {
        return id.value;
    })
    if (employees.includes(parseInt(manager)) === false) {
        manager = null;
    };
    finalEntry(firstName, lastName, employeeRole, manager);
}

// Sending all processed employee data to the database
const finalEntry = (firstName, lastName, employeeRole, manager) => {
    employeesDB.addingEmployee(firstName, lastName, employeeRole, manager).then(results => {
        if (results[0].affectedRows) {
            console.log('\n');
            console.log('Employee added!');
            console.log('\n');
        }
        mainMenu();
    })
}


// ADD ROLE
const addRole = () => {
    // Getting department names and ids to use as prompt choices
    employeesDB.viewingDepartments().then(data => {
        const departmentChoices = data[0].map(name => ({
            name: name.Department,
            value: name.Id
        }));
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
            finalEntryRole(response);
        })
}

// Adding role to database
const finalEntryRole = ({ role, salary, department }) => {
    employeesDB.addingRole(role, salary, department).then(data => {
        if (data[0].affectedRows) {
            console.log('\n');
            console.log('Role added!');
            console.log('\n');
        }
        mainMenu();
    });
}


// UPDATE EMPLOYEE
const updateEmployee = () => {
    // Getting employee names to use in prompt choices
    employeesDB.viewingEmployees().then(data => {
        const employees = data[0].map(person => ({
            name: `${person.First} ${person.Last}`,
            value: person.Id
        }));
        gettingRoles(employees);
    })
}

// Getting roles to use in prompt choices
const gettingRoles = (employees) => {
    employeesDB.viewingRoles().then(data => {
        const roleChoices = data[0].map(role => ({
            name: role.Title,
            value: role.Id
        }));
        updatePrompt(employees, roleChoices);
    })
}

// Inquirer prompt
const updatePrompt = (employees, roleChoices) => {
    const updatingEmployee = [
        {
            type: 'list',
            message: 'Which employee\'s role do you want to update?',
            choices: employees,
            name: 'employee'
        },
        {
            type: 'list',
            message: 'Which role do you want to assign the selected employee?',
            choices: roleChoices,
            name: 'role'
        }
    ]

    inquirer
        .prompt(updatingEmployee)
        .then(response => {
            finalQuery(response);
        })
}

// Updating employee role
const finalQuery = ({ employee, role }) => {
    employeesDB.updatingEmployee(employee, role).then(results => {
        if (results[0].affectedRows) {
            console.log('\n');
            console.log('Employee updated!');
            console.log('\n');
        };
        mainMenu();
    })
}


module.exports = mainMenu;