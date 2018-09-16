const path = require('path');
const shell = require('shelljs');

const description = 'Bundle your babel server for deployments';

const command = (jsType, options) => {
    const keymap = {
        js: () => {},
        react: () => {},
        vue: () => {},
        angular: () => {},
    };

    console.green('Your zip file is ready to be deployed. Run node server.js to deploy.');
};

const documentation = () => {
    console.yellow(`
Deployment zip file

    `);
};

module.exports = {
    command,
    description,
    documentation,
};
