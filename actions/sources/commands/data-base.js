const shell = require('shelljs');

const description = 'Use wrapper for the CLIs used for databases';

const command = (type) => {
    if (!type) {
        console.red('Enter a database type');
        return;
    }

    const dbType = {
        sql: 'sequelize',
        mongodb: 'mongoose',
    };

    const strs = arguments.slice(1);
    const str = strs.join(' ');

    if (dbType[type]) {
        shell.exec(`${dbType[type]} ${str}`);
        console.green('Wrapper for database type used.');
    } else {
        shell.exec(`${dbType[type]} --help`);
    }
};

const documentation = () => {
    console.yellow(`
Command:

Types:
    Data-Types
    -> sql
    -> mongodb

node-rails data-base <data-type> <native commands>
    `);
};

module.exports = {
    command,
    description,
    documentation,
};
