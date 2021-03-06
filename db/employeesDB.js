const connection = require('../config/connection');

class EmployeesDB {
    constructor(connection) {
        this.connection = connection;
    }
    // View formatted departments table
    viewingDepartments() {
        return this.connection.promise().query(`SELECT department.id AS Id,
        department.name AS Department
        FROM department`)
    }

    // View formatted roles table
    viewingRoles() {
        return this.connection.promise().query(`SELECT role.id AS Id,
        role.title AS Title,
        department.name AS Department,
        role.salary AS Salary
        FROM role
        JOIN department
        ON role.department_id = department.id`)
    }

    // View formatted employees table
    viewingEmployees() {
        return this.connection.promise().query(`SELECT employee.id AS Id,
        employee.first_name AS First,
        employee.last_name AS Last,
        role.title AS Role,
        department.name AS Department,
        role.salary AS Salary,
        CONCAT(MyManager.first_name, ' ', MyManager.last_name) AS Manager
        FROM employee
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee MyManager on MyManager.id = employee.manager_id`)
    }

    // Add department to the database
    addingDepartment(name) {
        return this.connection.promise().query(`INSERT INTO department(name) VALUES (?)`, name)
    }

    // Add role to database
    addingRole(role, salary, departmentId) {
        return this.connection.promise().query(`INSERT INTO role(role.title, role.salary, role.department_id) VALUES(?,?,?)`, [role, salary, departmentId]);
    }


    // Add employee to database
    addingEmployee(first, last, employeeRole, manager) {
        return this.connection.promise().query(`INSERT INTO employee(employee.first_name, employee.last_name, employee.role_id, employee.manager_id) VALUES (?,?,?,?)`, [first, last, employeeRole, manager]);
    }

    // Updating employee role
    updatingEmployee(employee, role) {
        return this.connection.promise().query(`UPDATE employee
        SET role_id = ?
        WHERE id = ?`, [role, employee]);
    }
}

module.exports = new EmployeesDB(connection);