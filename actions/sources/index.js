const fs = require('fs');
const path = require('path');

const tempRemoval = {
    'settings': 'settings',
    'new-redux-reducer': 'new-redux-reducer',
    'setup-data-base': 'setup-data-base',
};

const index = fs.readdirSync(path.join(__dirname, 'commands')).map(e => e.replace(RegExp('.js', 'ig'), '')).reduce((accumulation, file) => {
    if (!tempRemoval[file]) {
        const shortcut = file.split('-').map(e => e[0]).join('').toLowerCase();
        accumulation[file] = require(path.join(__dirname, 'commands', file));
        accumulation[shortcut] = require(path.join(__dirname, 'commands', file));
    }
    return accumulation;
}, {});

module.exports = index;
