const path = require('path');
const shell = require('shelljs');

module.exports = () => {

    const temp = path.join(__dirname, '..', '..', 'temp');

    shell.exec(`npm run clean:assets`);
    shell.exec(`node-rails settings react`);
    shell.exec(`npm run build:dev`);
    shell.exec(`npm test`);
    shell.exec(`node-rails settings js`);

};
