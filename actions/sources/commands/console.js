const path = require('path');
const shell = require('shelljs');
const { root_directory } = require('../utils');

const description = 'Access all of your Sequelize models with Node console';

const documentation = () => {
    console.cyan(`
Command:

node-rails console
    `);
};

const command = (...args) => {
    if (!root_directory()) {
        console.red('Must run this command in the root directory of your project.');
        return;
    }

    const root = process.cwd();
    const bin = path.join(root, 'bin', 'console');
    shell.exec(`${bin}`);
};

module.exports = {
    command,
    description,
    documentation,
};
