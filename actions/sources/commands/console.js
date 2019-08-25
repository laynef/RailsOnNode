const repl = require('repl');
const path = require('path');
const { root_directory } = require('../utils');

const description = 'Access all of your Sequelize models with Node console';

const documentation = () => {
    console.cyan(`
Command:

node-rails console
    `);
};

const command = (...args) => {
    if (!root_directory()) {
        console.red('Must run this command in the root directory of your project.');
        return;
    }

    const root = process.cwd();
    const models = require(path.join(root, 'app', 'models', 'index.js'));

    const r = repl.start('> ');
    Object.defineProperty(r.context, 'models', {
      configurable: true,
      enumerable: true,
      value: models
    });

};

module.exports = {
    command,
    description,
    documentation,
};
