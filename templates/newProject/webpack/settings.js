const path = require('path');


module.exports = {
    styleType: 'css',
    jsType: 'js',
    context: path.join(__dirname, '..'),
    useBootstrapToggle: false,
    useFontAwesomeToggle: false,
    webpackPlugins: [

    ],
    bootstrap: {
        scripts: {
            alert: true,
            button: true,
            carousel: true,
            collapse: true,
            dropdown: true,
            modal: true,
            popover: true,
            scrollspy: true,
            tab: true,
            tooltip: true,
            util: true,
        },
    },
    javascriptRules: {
        development: [{
            test: '.js$',
            exclude: 'node_modules',
            use: [{
                loader: 'babel-loader',
                options: {
                    "presets": ["env","stage-0"],
                }
            }],
        }],
        production: [{
            test: '.js$',
            exclude: 'node_modules',
            use: [{
                loader: 'babel-loader',
                options: {
                    "presets": ["env","stage-0"],
                }
            }],
        }]
    },
};
