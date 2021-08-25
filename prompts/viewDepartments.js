const tools = require('../config/connection');


const viewDepartments = () => {
    tools.db.query(`SELECT department.id AS Id, 
    department.name AS Department 
    FROM department`, (err, results) => {
        err
            ? console.error(err)
            : console.table(results);
    });
}

module.exports = viewDepartments;