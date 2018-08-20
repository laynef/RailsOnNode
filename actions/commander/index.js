const sources = require('../sources');

const Commander = function (commandName, args, flags) {
    var execute = function () {
        const options = flags.reduce((acculum, item) => {
            acculum = { ...acculum, ...item };
            return acculum;
        }, {});

        if (sources[commandName] && options.help) {
            return sources[commandName].documentation();
        } else if (sources[commandName]) {
            return sources[commandName].command(...args, options);
        } else {
            return sources.documentation.command();
        }
    };

    return { execute: execute };
};

module.exports = Commander;
