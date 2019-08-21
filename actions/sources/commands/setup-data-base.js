const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const { root_directory } = require('../utils');

const description = 'Setup a SQL database for yourself';

const command = (databaseType, options) => {
    const database = {
        'mongodb': 'mongoose',
        'sql': 'sequelize',
    };

    if (!databaseType || !options) {
        console.red('You must enter a database type');
        return;
    } else if (!database[databaseType]) {
        console.cyan('Database options are:');
        for (let i in database) {
            console.cyan(`=> ${i}`);
        }
        return;
    } else if (!root_directory()) {
        console.red('Must run this command in the root directory of your project.');
        return;
    }

    const packageJson = {
        mongodb: [
            'mongoose',
        ],
        sql: [
            'sequelize',
            'pg',
            'pg-hstore',
            'mysql',
            'tedious',
        ],
    };

    const dbTypes = {
        sql: './node_modules/sequelize-cli/src/sequelize',
        mongodb: './node_modules/mongoose-model-cli/bin/mongoose-model-cli',
    };

    const packageJsonDev = {
        mongodb: [
            'mongoose-model-cli',
        ],
        sql: [
            'sequelize-cli',
            'sqlite3',
        ],
    };

    const initializeCommand = {
        mongodb: 'init',
        sql: 'init',
    };

    const root = process.cwd();
    shell.exec(`npm i --save-dev ${packageJsonDev[databaseType].join(' ')}`);
    shell.exec(`npm i --save ${packageJson[databaseType].join(' ')}`);
    shell.cd(path.join(root, 'db'));
    shell.exec(`${dbTypes[databaseType]} ${initializeCommand[databaseType]}`);
    shell.cd(root)

    console.green('Your database has been setup');
};

const documentation = () => {
    console.cyan(`
Command:
Database Types:
=> sql: Using sequelize for any SQL database
=> mongodb: Using mongoose for your MongoDB database

node-rails setup-data-base (database-type)
    `);
};

module.exports = {
    command,
    description,
    documentation,
};
