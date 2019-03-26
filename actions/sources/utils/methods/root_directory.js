const fs = require('fs');
const path = require('path');


module.exports = () => {
    const root_path = process.cwd();
    const root_directory_path = path.join(root_path, 'package.json');
    return fs.existsSync(root_directory_path);
};
