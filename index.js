const db = require('mysql2');
const table = require('console.table');
const prompts = require('./prompts');

const init = () => {
    prompts.mainMenu();
}

init();