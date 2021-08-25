const connection = require('../config/connection');

class EmployeesDB {
    constructor(connection) {
        this.connection = connection;
    }

    viewingDepartments() {
        return this.connection.promise().query(`SELECT department.id AS Id,
        department.name AS Department
        FROM department`)
    }

    viewingRoles() {
        return this.connection.promise().query(`SELECT role.id AS Id,
        role.title AS Title,
        department.name AS Department,
        role.salary AS Salary
        FROM role
        JOIN department
        ON role.department_id = department.id`)
    }

    viewingEmployees() {
        return this.connection.promise().query(`SELECT employee.id AS id,
        employee.first_name,
        employee.last_name,
        role.title AS title,
        department.name AS department,
        role.salary AS salary,
        employee.manager_id AS manager
        FROM employee JOIN role ON employee.role_id = role.id
        JOIN department ON role.id = department.id`)
    }

    addingDepartment(name) {
        return this.connection.promise().query(`INSERT INTO department(name) VALUES (?)`, name)
    }

    getDepartments() {
        return this.connection.promise().query(`SELECT department.name FROM department`)
    }

    parsingRoleDepartment() {
        console.log('IN THE METHOD PARSING ROLE DEPARTMENT');
        return this.connection.promise().query(`SELECT * FROM department`)
        //  results => {
        //     console.log('HITTING THIS FUNCION')
        //     for (let i = 0; i < results.length; i++) {
        //         if (department === results[i].name) {
        //             department = results[i].id;
        //         }
        //     }
        //     return department;
        // });

        return departmentId;

        console.log(departmentId);
        console.log('CLASS METHOD');
        // return this.connection.promise().query(`INSERT INTO role(role.title, role.salary, department.name JOIN department ON role.department_id = department.id) VALUES(?,?,?)`, [role, salary, department]);
        return;
    }
}

module.exports = new EmployeesDB(connection);