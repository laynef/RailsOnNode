const { exec } = require('child_process');

const description = 'Congrats you are back';

const command = () => {
    exec(`node-rails create Serverside
        mv ./Serverside/* .
        rm -rf Serverside`);

    console.green('Getting your project back');
};

const documentation = () => {
    console.yellow(`Just do it`);
};

module.exports = {
    command,
    description,
    documentation,
};
