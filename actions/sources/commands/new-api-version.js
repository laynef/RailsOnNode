const fs = require('fs');
const path = require('path');
const { root_directory } = require('../utils');
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
    } else if (!root_directory()) {
        console.red('Must run this command in the root directory of your project.');
        return;
    }

    const templatePath = path.join(__dirname, '..', '..', '..', 'templates');
    const controllerPath = path.join(templatePath, 'newApiVersion');
    const routePath = path.join(templatePath, 'newRouteVersion');
    const docPath = path.join(templatePath, 'docs');

    const root = process.cwd();
    const settings = require(path.join(root, 'webpack', 'settings.js'));

    if (!fs.existsSync(path.join(root, 'controllers', `v${versionNumber}`))) {
        shell.cp('-R', controllerPath, path.join(root, 'controllers', `v${versionNumber}`));
        shell.cp('-R', routePath, path.join(root, 'routes', `v${versionNumber}`));
        shell.mkdir(path.join(root, 'assets', settings.jsType, 'pages', 'docs', `v${versionNumber}`));
        shell.mkdir(path.join(root, 'assets', settings.styleType, 'pages', 'docs', `v${versionNumber}`));

        const cssString = fs.readFileSync(path.join(docPath, 'page.css'), { encoding: 'utf8' });
        fs.writeFileSync(path.join(root, 'assets', settings.styleType, 'pages', 'docs', `v${versionNumber}`, `v${versionNumber}.${settings.styleType}`), cssString);
        shell.cp(path.join(docPath, 'page.js'), path.join(root, 'assets', settings.jsType, 'pages', 'docs', `v${versionNumber}`, `v${versionNumber}.${settings.jsType}`));

        console.green('Your new api version has been created.');
    } else {
        console.red('Your api version already exists.');
    }
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
