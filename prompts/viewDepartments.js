const tools = require('../config/connection');


const viewDepartments = () => {
    tools.db.query(`SELECT department.name AS Department, department.id AS Id FROM department`, (err, results) => {
        err
            ? console.error(err)
            : console.table(results);
    });
}

module.exports = viewDepartments;