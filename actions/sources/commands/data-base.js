const path = require('path');
const shell = require('shelljs');
const { root_directory } = require('../utils');

const description = 'Use wrapper for the CLIs used for databases';

const documentation = () => {
    console.cyan(`
Command:

node-rails data-base (sequelize cli commands)
    `);
};

const command = (type) => {
    if (!type) {
        console.red('Enter a database type');
        return;
    } else if (!root_directory()) {
        console.red('Must run this command in the root directory of your project.');
        return;
    }

    const root = process.cwd();
    const strs = [...arguments];
    const str = strs.slice(1).join(' ');

    shell.exec(`${path.join(root, 'bin', 'sequelize')} ${str}`);
    console.green('Wrapper for database type used.');
};

module.exports = {
    command,
    description,
    documentation,
};
