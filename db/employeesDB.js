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

    // viewingEmployees() {
    //     return this.connection.promise().query(`SELECT employee.id AS Id,
    //     employee.first_name AS First,
    //     employee.last_name AS Last,
    //     role.title AS Title,
    //     department.name AS Department,
    //     role.salary AS Salary,
    //     employee.manager_id AS Manager
    //     FROM employee JOIN role ON employee.role_id = role.id
    //     JOIN department ON role.id = department.id`)
    // }

    viewingEmployees() {
        return this.connection.promise().query(`SELECT employee.id AS ID,
        employee.first_name AS First,
        employee.last_name AS Last,
        role.title AS Role,
        department.name AS Department,
        role.salary AS Salary,
        employee.manager_id AS Manager
        FROM employee
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id`)
    }
    // viewingEmployees() {
    //     return this.connection.promise().query(`SELECT * FROM employee`);
    // }

    addingDepartment(name) {
        return this.connection.promise().query(`INSERT INTO department(name) VALUES (?)`, name)
    }

    getDepartments() {
        return this.connection.promise().query(`SELECT department.name FROM department`)
    }

    getRoles() {
        return this.connection.promise().query(`SELECT role.title FROM role`)
    }

    addingRole(role, salary, departmentId) {
        return this.connection.promise().query(`INSERT INTO role(role.title, role.salary, role.department_id) VALUES(?,?,?)`, [role, salary, departmentId]);
    }

    addingEmployee(first, last, roleId, managerId) {
        return this.connection.promise().query(`INSERT INTO employee(employee.first_name, employee.last_name, employee.role_id, employee.manager_id) VALUES (?,?,?,?)`, [first, last, roleId, managerId]);
    }
}

module.exports = new EmployeesDB(connection);