const tools = require('../config/connection');

const viewRoles = () => {
    tools.db.query(`SELECT role.title AS Role, role.id AS Id, role.salary AS Salary, role.department_id FROM role JOIN department ON role.department_id = department.id`, (err, results) => {
        err
            ? console.error(err)
            : console.table(results);
    });
};

module.exports = viewRoles;