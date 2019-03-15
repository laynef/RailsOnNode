const path = require('path');
const shell = require('shelljs');

module.exports = () => {

    const temp = path.join(__dirname, '..', '..', 'temp');

    shell.exec(`npm run clean:assets`);
    shell.exec(`node-rails settings less`);
    shell.exec(`npm run build:dev`);
    shell.exec(`npm test`);
    shell.exec(`node-rails settings css`);

};
