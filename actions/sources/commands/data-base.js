const path = require('path');
const shell = require('shelljs');
const { root_directory } = require('../utils');

const description = 'Use wrapper for Sequelize CLI for Rails on Node Structure';

const documentation = () => {
    console.cyan(`
Command:

node-rails data-base (sequelize cli commands)
    `);
};

const command = (...args) => {
    if (!root_directory()) {
        console.red('Must run this command in the root directory of your project.');
        return;
    }

    const root = process.cwd();
    const strs = [...args];
    strs.pop();
    const str = strs.join(' ');
    const bin = path.join(root, 'bin', 'sequelize');
    shell.exec(`${bin} ${str}`);
};

module.exports = {
    command,
    description,
    documentation,
};
