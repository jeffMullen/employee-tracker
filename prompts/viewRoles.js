const tools = require('../config/connection');

const viewRoles = () => {
    tools.db.query(`SELECT role.id AS Id, role.title AS Role, department.name AS Department,role.salary AS Salary FROM role JOIN department ON role.department_id = department.id`, (err, results) => {
        err
            ? console.error(err)
            : console.table(results);
    });
};

module.exports = viewRoles;