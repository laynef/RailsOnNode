const shell = require('shelljs');

const description = 'Use wrapper for the CLIs used for databases';

const documentation = () => {
    console.yellow(`
Command:

Types:
    Database-Types
    -> sql
    -> mongodb

Helps:
    Database-Types
    -> sql --help
    -> mongodb help

node-rails data-base <data-type> <native commands>
    `);
};

const command = (type) => {
    if (!type) {
        console.red('Enter a database type');
        return;
    }

    const dbType = {
        sql: 'sequelize',
        mongodb: 'mongoose',
    };

    const strs = [...arguments];
    const str = strs.slice(1).join(' ');

    if (dbType[type]) {
        shell.exec(`${dbType[type]} ${str}`);
        console.green('Wrapper for database type used.');
    } else {
        documentation();
    }
};

module.exports = {
    command,
    description,
    documentation,
};
