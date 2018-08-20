const fs = require('fs');
const path = require('path');
const allRoutes = require('../routes');

const customCircle = fs.readdirSync(path.join(__dirname, 'custom')).reduce((acc, item) => {
    if (item !== '.gitkeep') {
        acc[item] = require(path.join(__dirname, 'custom', item));
    }
    return acc;
}, {});

// mocha should catch on and can be different
for (let customTests in customCircle) {
    customCircle[customTests];
}

for (let apiVersion in allRoutes) {
    for (let route in allRoutes[apiVersion]) {
        const data = route;
        const controller = data.controller;
    }
}
