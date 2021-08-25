const connection = require('../config/connection');

class EmployeesDB {
    constructor(connection) {
        this.connection = connection;
    }

    addingDepartment(name) {
        return this.connection.db.promise().query(`INSERT INTO department(name) VALUES (?)`, name)
    }

    // addingRole(response) {
    //     { title, salary, department_id}
    // }
}

module.exports = new EmployeesDB(connection);