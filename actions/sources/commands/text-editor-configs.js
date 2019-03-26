const { exec } = require('child_process');
const { root_directory } = require('../utils');

const description = 'Setup text editor configurations';

const command = (type, options) => {
    if (!root_directory) {
        console.red('Must run this command in the root directory of your project.');
        return;
    }
    
    const textEditor = {
        'vscode': () => {
            exec(`code --list-extensions | xargs -L 1 echo code --install-extension`);
        },
        'atom': () => {
            exec(``);
        },
        'sublime': () => {
            exec(``);
        },
    };
    textEditor[type]();

    console.green('Save text editor config for teams');
};

const documentation = () => {
    console.yellow(`

    `);
};

module.exports = {
    command,
    description,
    documentation,
};
