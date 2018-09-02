const path = require('path');
const shell = require('shelljs');

module.exports = () => {

    const root = path.join(__dirname, '..', '..');

    shell.exec(`node-rails create temp`);
    shell.cd(path.join(root, 'temp'));
    shell.exec(`npm install`);
    shell.exec(`npm run build:dev`);
    shell.exec(`npm test`);
    shell.exec(`npm test`);
    shell.cd(root);
    shell.rm('-rf', path.join(root, 'temp'));
};