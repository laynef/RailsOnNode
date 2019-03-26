const fs = require('fs');
const path = require('path');

const method_path = path.join(__dirname, 'methods');

const imports = fs.readdirSync(path.join(method_path)).reduce((acc, file) => {
    if (fs.lstatSync(path.join(method_path, file)).isFile()) {
        const basename = file.slice(0).split('.').shift();
        const funct = require(path.join(method_path, file));
        acc[basename] = funct;
    }
    return acc;
}, {});

module.exports = imports;
