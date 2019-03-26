const fs = require('fs');
const path = require('path');


module.exports = () => {
    const root_path = process.cwd();
    return fs.existsSync(path.join(root_path, 'package.json'));
};
