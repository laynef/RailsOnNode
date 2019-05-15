const fs = require('fs');
const path = require('path');

const index = fs.readdirSync(path.join(__dirname)).reduce((acculum, item) => {
    if (fs.lstatSync(path.join(__dirname, item)).isDirectory()) {
        acculum[item] = require(path.join(__dirname, item));
    }
    return acculum;
}, {});

module.exports = index;
