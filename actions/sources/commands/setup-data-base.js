const path = require('path');
const shell = require('shelljs');

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
    }

    const root = process.cwd();
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

neutron setup-data-base <database-type>
    `);
};

module.exports = {
    command,
    description,
    documentation,
};
