const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const { root_directory } = require('../utils');

const description = 'Add new api controller to any api version';

const command = (controllerName, options) => {
    if (!controllerName || !options) {
        console.red('Must enter a controller name');
        return;
    } else if (!root_directory) {
        console.red('Must run this command in the root directory of your project.');
        return;
    }

    const templatePath = path.join(__dirname, '..', '..', '..', 'templates', 'newApiController');
    const root = process.cwd();
    const apiVersionPath = path.join(root, 'controllers', `v${options.version || 1}`, controllerName);

    if (fs.existsSync(apiVersionPath)) {
        console.red('This api controller already exists.');
    } else {
        shell.cp('-R', templatePath, apiVersionPath);

        console.green('Your new api controller has been created');
    }
};

const documentation = () => {
    console.yellow(`
Command:

node-rails new-api-controller <controller-name>
    `);
};

module.exports = {
    command,
    description,
    documentation,
};
