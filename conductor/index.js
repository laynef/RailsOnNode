const fs = require('fs');
const path = require('path');

const index = fs.readdirSync(path.join(__dirname, 'methods')).reduce((acculum, file) => {
    const pathname = path.join(__dirname, 'methods', file);
    acculum = Object.assign({}, acculum, require(pathname));
    return acculum;
}, {});

module.exports = index;
