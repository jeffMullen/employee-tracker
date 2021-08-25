const tools = require('../config/connection');

const viewEmployees = () => {
    tools.db.query(`SELECT employee.id AS id,
    employee.first_name,
    employee.last_name,
    role.title AS title,
    department.name AS department,
    role.salary AS salary,
    employee.manager_id AS manager
    FROM employee JOIN role ON employee.role_id = role.id
    JOIN department ON role.id = department.id`, (err, results) => {
        err
            ? console.error(err)
            : console.table(results)
    })
}

module.exports = viewEmployees;