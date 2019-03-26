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
        console.yellow('Database options are:');
        for (let i in database) {
            console.yellow(`=> ${i}`);
        }
        return;
    } else if (!root_directory) {
        console.red('Must run this command in the root directory of your project.');
        return;
    }

    const packageJson = {
        mongodb: {
            'mongoose': '^5.2.9',
        },
        sql: {
            'sequelize': '^4.38.0',
            'pg': '^6.1.0',
            'pg-hstore': '^2.3.2',
            'sqlite3': '^3.1.8',
            'mysql': '^2.16.0',
            'tedious': '^1.14.0',
        },
    };

    const packageJsonDev = {
        mongodb: {
            'mongoose-model-cli': '^1.4.0',
        },
        sql: {
            'sequelize-cli': '^4.0.0',
        },
    };

    const root = process.cwd();
    const packages = require(path.join(root, 'package.json'));
    packages.dependencies = Object.assign({}, packages.dependencies, packageJson[databaseType]);
    packages.devDependencies = Object.assign({}, packages.devDependencies, packageJsonDev[databaseType]);
    fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(packages, null, 4));

    const templatePath = path.join(__dirname, '..', '..', '..', 'templates');
    shell.cp('-R', path.join(templatePath, database[databaseType]), path.join(root, 'temp'));
    shell.mv(`${path.join(root, 'temp')}/*`, '.');
    shell.rm('-rf', path.join(root, 'temp'));

    console.green('Your database has been setup');
};

const documentation = () => {
    console.yellow(`
Command:
Database Types:
=> sql: Using sequelize for any SQL database
=> mongodb: Using mongoose for your MongoDB database

node-rails setup-data-base <database-type>
    `);
};

module.exports = {
    command,
    description,
    documentation,
};
