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
