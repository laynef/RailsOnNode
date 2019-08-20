const path = require('path');


module.exports = {
    "context": path.join(__dirname, '..'),
    "styleType": 'css',
    "jsType": 'js',
    "useBootstrapToggle": false,
    "useFontAwesomeToggle": false,
    "webpackPlugins": [

    ],
    "webpackOverrides": {

    },
    "bootstrap": {
        "scripts": {
            "alert": true,
            "button": true,
            "carousel": true,
            "collapse": true,
            "dropdown": true,
            "modal": true,
            "popover": true,
            "scrollspy": true,
            "tab": true,
            "tooltip": true,
            "util": true,
        },
    },
    "javascriptRules": {
        "development": [{
            "test": '.js$',
            "exclude": 'node_modules',
            "use": [{
                "loader": 'babel-loader',
                "options": {
                    "presets": ["env","stage-0"],
                }
            }],
        }],
        "production": [{
            "test": '.js$',
            "exclude": 'node_modules',
            "use": [{
                "loader": 'babel-loader',
                "options": {
                    "presets": ["env","stage-0"],
                }
            }],
        }]
    },
};
