const path = require('path');
const shell = require('shelljs');
const { isNumber } = require('lodash');

const description = 'Create a new api version';

const command = (versionNumber, options) => {
    if (!versionNumber || !options) {
        console.red('Must enter a version number for your api');
        return;
    } else if (isNumber(versionNumber)) {
        console.red('API Version number must be a number');
        return;
    }

    const templatePath = path.join(__dirname, '..', '..', '..', 'templates');
    const controllerPath = path.join(templatePath, 'newApiVersion');
    const routePath = path.join(templatePath, 'newRouteVersion');
    const root = process.cwd();
    shell.cp('-R', controllerPath, path.join(root, 'controllers', `v${versionNumber}`));
    shell.cp('-R', routePath, path.join(root, 'routes', `v${versionNumber}`));

    console.green('Your new api version has been created.');
};

const documentation = () => {
    console.yellow(`
Command:

node-rails new-api-version <version-number>
    `);
};

module.exports = {
    command,
    description,
    documentation,
};
