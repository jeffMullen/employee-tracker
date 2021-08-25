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

    // addingRole(response) {
    //     { title, salary, department_id}
    // }
}

module.exports = new EmployeesDB(connection);