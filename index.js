const db = require('mysql2');
const table = require('console.table');
const mainMenu = require('./prompts');

const init = () => {
    mainMenu();
}

init();