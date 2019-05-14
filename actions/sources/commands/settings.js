const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const { root_directory } = require('../utils');

const description = 'Change javascript frameworks or style types';

const command = (type, options) => {
    if (!type || !options) {
        console.red(`Please select a type of asset to change.`);
        return;
    } else if (!root_directory()) {
        console.red('Must run this command in the root directory of your project.');
        return;
    }

    const allTypes = {
        'react': 'jsx',
        'angular': 'ts',
        'vue': 'vue',
        'js': 'js',
        'less': 'less',
        'sass': 'scss',
        'css': 'css',
        'bootstrap': 'bootstrap',
    };

    const TYPING = {
        'javascripts': {
            'react': 'jsx',
            'angular': 'ts',
            'vue': 'vue',
            'js': 'js',
        },
        'stylesheets': {
            'less': 'less',
            'sass': 'scss',
            'css': 'css',
        },
    };

    if (!allTypes[type]) {
        console.red('Must use a supported type for settings.');
        return;
    }

    const assetsReplacements = {
        react: 'page.jsx',
        angular: 'page.ts',
        vue: 'vue.js',
        js: 'page.js',
    };

    const componentReplacements = {
        react: 'jsx',
        angular: 'ts',
        vue: 'js',
        js: 'js',
        sass: 'scss',
        less: 'less',
        css: 'css',
    };

    const suffixReplacements = {
        jsx: 'jsx',
        ts: 'ts',
        vue: 'js',
        js: 'js',
        sass: 'scss',
        less: 'less',
        css: 'css',
    };

    const notSupported = {
        'angular': 'angular',
    };

    if (notSupported[type]) {
        console.red(`Not supported yet.`);
        return;
    }

    const root = process.cwd();
    const pathn = path.join(root, 'webpack', 'settings.js');
    let settings = require(pathn);

    if (type === 'bootstrap') {
        if (options.switch) {
            settings.useBootstrapToggle = true;
        } else {
            settings.useBootstrapToggle = false;
        }
        fs.writeFileSync(pathn, `module.exports = ${JSON.stringify(settings, null, 4)};`);

        console.green(`Toggled bootstrap ${settings.useBootstrapToggle ? 'on' : 'off'}`);
        return null;
    }

    let CURR_JS = '';
    let CURR_CSS = '';

    const reverseJs = Object.values(TYPING.javascripts).reduce((acc, item) => {
        acc[item] = item;
        return acc;
    }, {});

    const reverseCss = Object.values(TYPING.stylesheets).reduce((acc, item) => {
        acc[item] = item;
        return acc;
    }, {});

    const trail = fs.readdirSync(path.join(root, 'assets')).reduce((acc, item) => {
        if (reverseCss[item] && TYPING.stylesheets[type]) {
            acc.push(item);
            acc.push(TYPING.stylesheets[type]);
        }
        if (reverseCss[item]) {
            CURR_CSS = item;
        }
        if (reverseJs[item]) {
            CURR_JS = item;
        }
        if (reverseJs[item] && TYPING.javascripts[type]) {
            acc.push(item);
            acc.push(TYPING.javascripts[type]);
        }
        return acc;
    }, []);

    const before = trail[0];
    const after = trail[1];

    // Final catch for same types
    if ((TYPING.stylesheets[type] && CURR_CSS === after) || (TYPING.javascripts[type] && CURR_JS === after)) {
        console.red(`Your settings are already set to ${type}`);
        return null;
    }

    const jsStrings = {
        react: (pathNames, beforeType) => {
            const pathn = path.join(__dirname, '..', '..', '..', 'templates', 'assets', 'page.jsx');
            const str = fs.readFileSync(pathn, { encoding: 'utf8' });

            const root = process.cwd();
            const settings = require(path.join(root, 'webpack', 'settings.js'));

            // replacements
            const regexStyles = /\/\/ Route Path/ig; // for styles
            const regexRedux = /\/\/ Redux here/ig; // for redux

            const pathnm = pathNames.split('/');
            let boolZero = false;
            let strPathNames = pathnm.reduce((acc, item) => {
                if (boolZero) {
                    acc.push(item);
                }
                if (item === 'pages') {
                    boolZero = true;
                }
                return acc;
            }, []);

            strPathNames.unshift('');

            let boolOne = false;

            const rescurveStr = pathnm.reduce((acc, item) => {
                if (item === 'assets') {
                    boolOne = true;
                }
                if (boolOne) {
                    acc.push(item);
                }
                return acc;
            }, []).slice(1);
            const recursiveStrings = rescurveStr.map(() => {
                return '..';
            });
            const reduxRecursive = recursiveStrings.slice(2).concat(['redux', 'store']);
            const rescurveNames = rescurveStr.map((e, i, a) => {
                if (i === a.length - 1) {
                    const filen = e.split('.');
                    const filename = filen[0];
                    return filename;
                } else if (i === 0) {
                    return settings.styleType;
                } else {
                    return e;
                }
            });
            const regexStylesString = recursiveStrings.slice(1).concat(rescurveNames).join('/');

            const pugFile = path.join(root, 'views', 'utils', 'new-page.pug');
            fs.writeFileSync(pugFile, '#app!=serversideString');

            const regexReduxString = reduxRecursive.join('/');

            fs.writeFileSync(pathNames, str.replace(regexRedux, regexReduxString).replace(regexStyles, regexStylesString));

            const errorDirectories = [
                '403',
                '404',
                '500',
            ];

            errorDirectories.forEach((error) => {
                const componentPath = path.join(root, 'assets', beforeType, 'pages', 'errors', error, 'component.jsx');
                const templatePath = path.join(__dirname, '..', '..', '..', 'templates', 'errors', 'react', `${error}.jsx`);
                const templateString = fs.readFileSync(templatePath, { encoding: 'utf8' });

                fs.writeFileSync(componentPath, templateString);

                const componentViewPath = path.join(root, 'views', 'errors', `${error}.pug`);
                const templateViewPath = path.join(__dirname, '..', '..', '..', 'templates', 'errors', 'react', `${error}.pug`);
                const templateViewString = fs.readFileSync(templateViewPath, { encoding: 'utf8' });

                fs.writeFileSync(componentViewPath, templateViewString);
            });
        },
        angular: (pathNames, beforeType) => {
            const pathn = path.join(__dirname, '..', '..', '..', 'templates', 'assets', 'page.ts');
            const str = fs.readFileSync(pathn, { encoding: 'utf8' });

            const root = process.cwd();
            const settings = require(path.join(root, 'webpack', 'settings.js'));

            // replacements
            const regexStyles = /\/\/ Route Path/ig; // for styles
            const regexRedux = /\/\/ Redux here/ig; // for redux

            const pathnm = pathNames.split('/');
            let boolZero = false;
            let strPathNames = pathnm.reduce((acc, item) => {
                if (boolZero) {
                    acc.push(item);
                }
                if (item === 'pages') {
                    boolZero = true;
                }
                return acc;
            }, []);

            strPathNames.unshift('');

            let boolOne = false;
            const rescurveStr = pathnm.reduce((acc, item) => {
                if (item === 'assets') {
                    boolOne = true;
                }
                if (boolOne) {
                    acc.push(item);
                }
                return acc;
            }, []).slice(1);
            const recursiveStrings = rescurveStr.map(() => {
                return '..';
            });
            const reduxRecursive = recursiveStrings.slice(2).concat(['redux', 'store']);
            const rescurveNames = rescurveStr.map((e, i, a) => {
                if (i === a.length - 1) {
                    const filen = e.split('.');
                    const filename = filen[0];
                    return filename;
                } else if (i === 0) {
                    return settings.styleType;
                } else {
                    return e;
                }
            });
            const regexStylesString = recursiveStrings.slice(1).concat(rescurveNames).join('/');

            const pugFile = path.join(root, 'views', 'utils', 'new-page.pug');
            fs.writeFileSync(pugFile, '#app!=serversideString');

            const regexReduxString = reduxRecursive.join('/');

            fs.writeFileSync(pathNames, str.replace(regexRedux, regexReduxString).replace(regexStyles, `'${regexStylesString}',`));
        },
        vue: (pathNames, beforeType) => {
            const pathn = path.join(__dirname, '..', '..', '..', 'templates', 'assets', 'vue.js');
            const str = fs.readFileSync(pathn, { encoding: 'utf8' });

            const root = process.cwd();
            const settings = require(path.join(root, 'webpack', 'settings.js'));

            // replacements
            const regexStyles = /\/\/ Route Path/ig; // for styles
            const regexRedux = /\/\/ Redux here/ig; // for redux

            const pathnm = pathNames.split('/');
            let boolZero = false;
            let strPathNames = pathnm.reduce((acc, item) => {
                if (boolZero) {
                    acc.push(item);
                }
                if (item === 'pages') {
                    boolZero = true;
                }
                return acc;
            }, []);

            strPathNames.unshift('');

            let boolOne = false;
            const rescurveStr = pathnm.reduce((acc, item) => {
                if (item === 'assets') {
                    boolOne = true;
                }
                if (boolOne) {
                    acc.push(item);
                }
                return acc;
            }, []).slice(1);
            const recursiveStrings = rescurveStr.map(() => {
                return '..';
            });
            const reduxRecursive = recursiveStrings.slice(2).concat(['redux', 'store']);
            const rescurveNames = rescurveStr.map((e, i, a) => {
                if (i === a.length - 1) {
                    const filen = e.split('.');
                    const filename = filen[0];
                    return filename;
                } else if (i === 0) {
                    return settings.styleType;
                } else {
                    return e;
                }
            });
            const regexStylesString = recursiveStrings.slice(1).concat(rescurveNames).join('/');

            const pugFile = path.join(root, 'views', 'utils', 'new-page.pug');
            fs.writeFileSync(pugFile, '#app!=serversideString');

            const regexReduxString = reduxRecursive.join('/');

            fs.writeFileSync(pathNames, str.replace(regexRedux, regexReduxString).replace(regexStyles, `import '${regexStylesString}';`));
        },
        js: (pathNames, beforeType) => {
            const pathn = path.join(__dirname, '..', '..', '..', 'templates', 'assets', 'page.js');
            const str = fs.readFileSync(pathn, { encoding: 'utf8' });

            const root = process.cwd();
            const settings = require(path.join(root, 'webpack', 'settings.js'));

            // replacements
            const regexStyles = /\/\/ Route Path/ig; // for styles
            const regexRedux = /\/\/ Redux here/ig; // for redux

            const pathnm = pathNames.split('/');
            let boolZero = false;
            let strPathNames = pathnm.reduce((acc, item) => {
                if (boolZero) {
                    acc.push(item);
                }
                if (item === 'pages') {
                    boolZero = true;
                }
                return acc;
            }, []);

            strPathNames.unshift('');

            let boolOne = false;
            const rescurveStr = pathnm.reduce((acc, item) => {
                if (item === 'assets') {
                    boolOne = true;
                }
                if (boolOne) {
                    acc.push(item);
                }
                return acc;
            }, []).slice(1);
            const recursiveStrings = rescurveStr.map(() => {
                return '..';
            });
            const reduxRecursive = recursiveStrings.slice(2).concat(['redux', 'store']);
            const rescurveNames = rescurveStr.map((e, i, a) => {
                if (i === a.length - 1) {
                    const filen = e.split('.');
                    const filename = filen[0];
                    return filename;
                } else if (i === 0) {
                    return settings.styleType;
                } else {
                    return e;
                }
            });
            const regexStylesString = recursiveStrings.slice(1).concat(rescurveNames).join('/');

            const pugFile = path.join(root, 'views', 'utils', 'new-page.pug');
            fs.writeFileSync(pugFile, 'h1(style="text-align: center;") Hello World');

            const regexReduxString = reduxRecursive.join('/');

            fs.writeFileSync(pathNames, str.replace(regexRedux, regexReduxString).replace(regexStyles, `import '${regexStylesString}';`));

            const errorDirectories = [
                '403',
                '404',
                '500',
            ];

            errorDirectories.forEach((error) => {
                const componentViewPath = path.join(root, 'views', 'errors', `${error}.pug`);
                const templateViewPath = path.join(__dirname, '..', '..', '..', 'templates', 'errors', 'js', `${error}.pug`);
                const templateViewString = fs.readFileSync(templateViewPath, { encoding: 'utf8' });

                fs.writeFileSync(componentViewPath, templateViewString);
            });
        },
    };

    const jsWebpack = {
        'react': {
            "development": [{
                'test': '.jsx?$',
                'exclude': 'node_modules',
                'use': [{
                    'loader': 'babel-loader',
                    'options': {
                        "presets": ["react","env","stage-0","react-hmre"],
                        "plugins": [ "transform-runtime", "add-module-exports", "transform-decorators-legacy", "transform-react-display-name", "transform-imports", ["react-transform", {"transforms": [{"transform": "react-transform-hmr","imports": ["react"],"locals": ["module"]}]}]],
                    },
                }],
            }],
            "production": [{
                'test': '.jsx?$',
                'exclude': 'node_modules',
                'use': [{
                    'loader': 'babel-loader',
                    'options': {
                        'presets': ["react","env","stage-0"],
                        "plugins": ["transform-runtime","add-module-exports","transform-decorators-legacy","transform-react-display-name"],
                    },
                }],
            }],
        },
        'angular': [{
            'test': '.ts$',
            'exclude': 'node_modules',
            'use': ['babel-loader'],
        }],
        'vue': {
            "development": [
                {
                    "test": ".vue$",
                    "exclude": "node_modules",
                    "use": [{
                        "loader": "vue-loader",
                        "options": {
                            "presets": ["vue","env","stage-3"],
                            "plugins": ["transform-runtime"]
                        }
                    }]
                },
                {
                    "test": ".js$",
                    "loader": "babel-loader",
                    "exclude": "node_modules"
                },
                {
                    "test": ".pug$",
                    "oneOf": [
                        { "resourceQuery": "^\\?vue", "use": ["pug-plain-loader"] },
                        { "use": ["raw-loader", "pug-plain-loader"] }
                    ]
                },
                {
                    "test": ".html$",
                    "oneOf": [
                        { "resourceQuery": "^\\?vue", "use": ["html-loader"] },
                        { "use": ["html-loader"] }
                    ]
                }
            ],
            "production": [
                {
                    "test": ".vue$",
                    "exclude": "node_modules",
                    "use": [{
                            "loader": "vue-loader",
                            "options": {
                                "presets": ["vue", "env", "stage-3"],
                                "plugins": ["transform-runtime"]
                            }
                        }]
                },
                {
                    "test": ".js$",
                    "loader": "babel-loader",
                    "exclude": "node_modules"
                },
                {
                    "test": ".pug$",
                    "oneOf": [
                        { "resourceQuery": "^\\?vue", "use": ["pug-plain-loader"] },
                        { "use": ["raw-loader", "pug-plain-loader"] }
                    ]
                },
                {
                    "test": ".html$",
                    "oneOf": [
                        { "resourceQuery": "^\\?vue", "use": [ "html-loader" ] },
                        { "use": ["html-loader"] }
                    ]
                }]
        },
        'js': {
            "development": [{
                'test': '.js$',
                'exclude': 'node_modules',
                'use': [{
                    'loader': 'babel-loader',
                    'options': {
                        "presets": ["env","stage-0"],
                    }
                }],
            }],
            "production": [{
                'test': '.js$',
                'exclude': 'node_modules',
                'use': [{
                    'loader': 'babel-loader',
                    'options': {
                        "presets": ["env","stage-0"],
                    }
                }],
            }]
        },
    };

    const babelRc = {
        react: () => {
            fs.writeFileSync(path.join(root, '.babelrc'), `{

    "presets": [
        "react",
        "env",
        "stage-0"
    ],

    "plugins": [
        "transform-runtime",
        "add-module-exports",
        "transform-decorators-legacy",
        "transform-react-display-name",
        "transform-imports"
    ]

}
        `)
        },
        angular: () => {
            fs.writeFileSync(path.join(root, '.babelrc'), `{

    "presets": [
        "react",
        "env",
        "stage-0"
    ],

    "plugins": [
        "transform-runtime",
        "add-module-exports",
        "transform-decorators-legacy",
        "transform-react-display-name",
        "transform-imports"
    ]

}
            `)
        },
        vue: () => {
            fs.writeFileSync(path.join(root, '.babelrc'), `{

    "presets": [
        "vue",
        "env",
        "stage-3"
    ],

    "plugins": [
        "transform-runtime"
    ],

}
            `)
        },
        js: () => {
            fs.writeFileSync(path.join(root, '.babelrc'), `{

    "presets": [
        "env",
        "stage-0"
    ]

}
        `)
        },
    };

    const serverSideRendering = {
        react: () => {
            fs.writeFileSync(path.join(process.cwd(), 'utils', 'methods', 'serverside.js'), `const path = require('path');
const settings = require('../../webpack/settings');


module.exports = {

    serverSide: (pageName, req) => {
        const assets = path.join(__dirname, '..', '..', 'assets', settings.jsType);
        const store = require(path.join(assets, 'redux', 'store'))(req.session.redux || {});
        const componentArray = pageName.split('/');
        componentArray.pop();
        const componentPath = componentArray.join('/') + '/component';

        const Application = require(path.join(assets, componentPath));
        req.session.redux = req.session.redux || store.getState();

        const getServersideString = require('../../webpack/serverside');

        return {
            serversideStorage: JSON.stringify(req.session.redux),
            serversideString: getServersideString(Application, store),
        };
    },

    getFreshReduxStore: (req) => {
        const assets = path.join(__dirname, '..', '..', 'assets', settings.jsType);
        const store = require(path.join(assets, 'redux', 'store'))(req.session.redux || {});
        return store.getState();
    }

};
            `);
        },
        angular: () => {
            fs.writeFileSync(path.join(process.cwd(), 'utils', 'methods', 'serverside.js'), `

            `);
        },
        vue: () => {
            fs.writeFileSync(path.join(process.cwd(), 'utils', 'methods', 'serverside.js'), `const path = require('path');
const settings = require('../../webpack/settings');


module.exports = {

    serverSide: (pageName, req) => {
        const assets = path.join(__dirname, '..', '..', 'assets', settings.jsType);
        req.session.state = req.session.state || require(path.join(assets, 'redux', 'store'))();
        const getServersideString = require('../../webpack/serverside');

        const assetPath = path.join(assets, pageName);
        const fileArray = assetPath.split('/');
        fileArray.pop();
        const filePath = fileArray.join('/') + '/component.vue';

        console.log(getServersideString(filePath))

        return Promise.all([
            getServersideString(filePath),
            req.session.state,
        ])
        .then((htmls) => {
            return {
                serversideStorage: JSON.stringify(htmls[1]),
                serversideString: htmls[0],
            };
        })
        .catch(() => {
            return {
                serversideStorage: JSON.stringify({}),
                serversideString: '',
            };
        });
    },

    getFreshReduxStore: (req) => {
        const assets = path.join(__dirname, '..', '..', 'assets', settings.jsType);
        const store = require(path.join(assets, 'redux', 'store'))(req.session.redux || {});
        return store.getState();
    }

};
            `);
        },
        js: () => {
            fs.writeFileSync(path.join(process.cwd(), 'utils', 'methods', 'serverside.js'), `const path = require('path');
const settings = require('../../webpack/settings');

module.exports = {

    serverSide: (pageName, req) => {
        const assets = path.join(__dirname, '..', '..', 'assets', settings.jsType, 'redux', 'store');
        const store = require(assets);
        req.session.redux = req.session.redux || store();

        return {
            serversideStorage: JSON.stringify(req.session.redux),
        };
    },

    getFreshReduxStore: (req) => {
        const assets = path.join(__dirname, '..', '..', 'assets', settings.jsType);
        const store = require(path.join(assets, 'redux', 'store'))(req.session.redux || {});
        return store.getState();
    }

};
            `);
        },
    };

    const webpackServersideFunction = {
        react: () => {
            fs.writeFileSync(path.join(process.cwd(), 'webpack', 'serverside.js'), `const React = require('react');
const { Provider } = require('react-redux');
const { renderToStaticMarkup } = require('react-dom/server');

module.exports = (Component, store) => {
    return renderToStaticMarkup(
        <Provider store={store}>
            <Component />
        </Provider>
    );
}
            `);
        },
        angular: () => {
            fs.writeFileSync(path.join(process.cwd(), 'webpack', 'serverside.js'), `module.exports = () => {

};
            `)
        },
        vue: () => {
            fs.writeFileSync(path.join(process.cwd(), 'webpack', 'serverside.js'), `const Vue = require('vue');
const { createRenderer } = require('vue-server-renderer');

module.exports = (filePath) => {
    const renderer = createRenderer();
    const vue = new Vue({ render: h => h(require(filePath)) });
    return renderer.renderToString(vue, {})
        .then((html) => html)
        .catch(() => '');
};
            `)
        },
        js: () => {
            fs.writeFileSync(path.join(process.cwd(), 'webpack', 'serverside.js'), `module.exports = () => {

};
            `);
        }
    }

    // styles change file path types
    // javascript change full root files
    const arrayOfPaths = (data, pathn) => {
        fs.readdirSync(pathn).forEach(dir => {
            if (dir !== 'docs') {
                if (fs.lstatSync(path.join(pathn, dir)).isDirectory()) {
                    const temp = data;
                    arrayOfPaths(temp, path.join(pathn, dir));
                } else {
                    data.push(path.join(pathn, dir));
                }
            }
        });

        return data;
    };

    const beforeTypes = arrayOfPaths([], path.join(root, 'assets', before, 'pages'));

    beforeTypes.forEach(dir => {
        const fileArray = dir.split('/');
        const filename = fileArray[fileArray.length - 1].split('.')[0];
        if (filename !== 'component') {
            const newFilename = filename + '.' + componentReplacements[type];
            const newFile = fileArray.slice(0, fileArray.length - 1).join('/') + '/' + newFilename;
            const newComponentFile = fileArray.slice(0, fileArray.length - 1).join('/') + '/' + `component.${after}`;

            if (TYPING.javascripts[type] === after) {
                shell.cp(path.join(__dirname, '..', '..', '..', 'templates', 'assets', assetsReplacements[type]), newFile);
                if (after !== 'js') shell.cp(path.join(__dirname, '..', '..', '..', 'templates', 'assets', `component.${after}`), newComponentFile);
                shell.mv(dir, newFile);
                jsStrings[type](newFile, before);
            } else if (TYPING.stylesheets[type] === after) {
                const jsPaths = dir.replace(RegExp(CURR_CSS, 'ig'), CURR_JS);
                const fileArray = jsPaths.split('/');
                const fileName = fileArray.pop();
                const fileSuffixArray = fileName.split('.');
                fileSuffixArray[1] = suffixReplacements[CURR_JS];
                const finalPath = fileArray.join('/') + '/' + fileSuffixArray.join('.');
                const str = fs.readFileSync(finalPath, { encoding: 'utf8' });
                fs.writeFileSync(finalPath, str.replace(RegExp(CURR_CSS, 'ig'), after));
                shell.mv(dir, newFile);
            }
        } else {
            shell.rm(dir);
        }
    });

    // Handle webpack here
    if (TYPING.javascripts[type]) {
        settings.jsType = after;
        settings.javascriptSettings = jsWebpack[type];
    } else if (TYPING.stylesheets[type]) {
        settings.styleType = after;
    }

    if (TYPING.javascripts[type]) {
        shell.rm('-rf', path.join(root, 'assets', before, 'redux') + '/*');
        shell.cp('-R', path.join(__dirname, '..', '..', '..', 'templates', 'redux', type) + '/*', path.join(root, 'assets', before, 'redux'));
    }
    shell.mv(path.join(root, 'assets', before), path.join(root, 'assets', after));

    if (serverSideRendering[type]) serverSideRendering[type]();
    if (webpackServersideFunction[type]) webpackServersideFunction[type]();
    if (babelRc[type]) babelRc[type]();
    fs.writeFileSync(pathn, `module.exports = ${JSON.stringify(settings, null, 4)}`);

    console.green(`Your settings have been changed from ${before} to ${after}`);
};

const documentation = () => {
    console.yellow(`
Commands:
    bootstrap [options: --switch=(true || false)]

    stylesheets
    -> css
    -> less
    -> sass

Command:
node-rails settings <command-name> [Options]
    `);
};

module.exports = {
    command,
    description,
    documentation,
};
