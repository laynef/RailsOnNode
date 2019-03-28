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
    shell.cd(path.join(root, directoryName, 'openssl'));
    shell.exec('bash generateSecretKeys.sh web-secret');
    shell.cd(path.join(root, directoryName));

    if (options.api) {
        const template_path = path.join(__dirname, '..', '..', '..', 'templates');
        const api_template_path = path.join(template_path, 'api');

        fs.writeFileSync(path.join(api_template_path, 'app.js'), fs.readFileSync(path.join(root, 'app.js')));
        fs.writeFileSync(path.join(api_template_path, 'server.js'), fs.readFileSync(path.join(root, 'server.js')));
        fs.writeFileSync(path.join(api_template_path, 'package.json'), fs.readFileSync(path.join(root, 'package.json')));
        shell.cp(path.join(api_template_path, 'nodemon.json'), path.join(root, 'nodemon.json'));
    }

    console.green('Your project is ready.');
};

const documentation = () => {
    console.yellow(`
Command:

node-rails create <directory-name>
    `);
};

module.exports = {
    command,
    description,
    documentation,
};
