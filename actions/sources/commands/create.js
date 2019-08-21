const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const description = 'Create a new project';

const command = (directoryName, options) => {
    if (!directoryName || !options) {
        console.red('Must give your project a name');
        return;
    }

    const root = process.cwd();
    shell.cp('-R', path.join(__dirname, '..', '..', '..', 'templates', 'newProject'), path.join(root, directoryName));
    shell.cd(path.join(root, directoryName));
    shell.mv(path.join(root, directoryName, 'gitignore'), path.join(root, directoryName, '.gitignore'));
    shell.exec('git init');
    shell.cd(path.join(root, directoryName, 'config', 'openssl'));
    shell.exec('bash generateSecretKeys.sh web-secret');
    shell.exec('bash generateHttps.sh localhost');
    shell.cd(path.join(root));

    if (options.api) {
        const template_path = path.join(__dirname, '..', '..', '..', 'templates');
        const api_template_path = path.join(template_path, 'api');

        shell.rm(path.join(root, directoryName, 'app', 'index.js'));
        shell.rm(path.join(root, directoryName, 'package.json'));
        shell.rm(path.join(root, directoryName, 'index.js'));

        shell.cp(path.join(api_template_path, 'app', 'index.js'), path.join(root, directoryName, 'app', 'index.js'));
        shell.cp(path.join(api_template_path, 'index.js'), path.join(root, directoryName, 'index.js'));
        shell.cp(path.join(api_template_path, 'package.json'), path.join(root, directoryName, 'package.json'));
        shell.cp(path.join(api_template_path, 'nodemon.json'), path.join(root, directoryName, 'nodemon.json'));
    }

    shell.cd(path.join(root, directoryName));

    console.green('Your project is ready.');
};

const documentation = () => {
    console.cyan(`
Command:

Options:
--api

For a server meant only for an API, webpack is still required to run initally
however only API documentation assets are used by default.

By default all web server features are available

node-rails create <directory-name>
    `);
};

module.exports = {
    command,
    description,
    documentation,
};
