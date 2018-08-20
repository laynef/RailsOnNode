const fs = require('fs');
const path = require('path');

// This will assign your controller function with the name of the file
const index = fs.readdirSync(path.join(__dirname))
    .reduce((acculum, item) => {
        const filename = item.replace(/\.js/g, '');
        acculum[filename] = require(path.join(__dirname, filename));
        return acculum;
    }, {});

module.exports = index;
