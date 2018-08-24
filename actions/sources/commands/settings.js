const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const description = 'Change javascript frameworks or style types';

const command = (type, options) => {
    if (!type || !options) {
        console.red(`Please select a type of asset to change`);
        return;
    }

    const root = process.cwd();
    const pathn = path.join(root, 'webpack', 'settings.js');
    const settings = require(pathn);

    if (type === 'bootstrap') {
        if (options.switch == true) {
            settings.useBootstrapToggle = true;
        } else {
            settings.useBootstrapToggle = false;
        }
        fs.writeFileSync(pathn, `module.exports = ${JSON.stringify(settings, null, 4)};`);
        return null;
    }

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

    const jsStrings = {
        react: (pathNames) => {
            const pathn = path.join(__dirname, '..', '..', '..', 'templates', 'assets', 'page.jsx');
            const str = fs.readFileSync(pathn, { encoding: 'utf8' });

            const root = process.cwd();
            const settings = require(path.join(root, 'webpack', 'settings.js'));

            // replacements
            const regexStyles = /\/\/ Route Path/ig; // for styles
            const regexRedux = new RegExp('// Redux here', 'ig'); // for redux

            const pathnm = pathNames.split('/');
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
            const regexStylesString = recursiveStrings.concat(rescurveNames).join('/');

            const pugFile = path.join(root, 'views', 'utils', 'new-page.pug');
            fs.writeFileSync(pugFile, '#app!=serverSideRendering');

            const regexReduxString = reduxRecursive.join('/');

            shell.cp('-R', path.join(__dirname, '..', '..', '..', 'templates', 'redux', 'react'), path.join(root, 'assets', after, 'redux'))

            fs.writeFileSync(pathNames, str.replace(regexRedux, regexReduxString).replace(regexStyles, `import "${regexStylesString}";`));
        },
        angular: (pathNames) => {
            const pathn = path.join(__dirname, '..', '..', '..', 'templates', 'assets', 'page.ts');
            const str = fs.readFileSync(pathn, { encoding: 'utf8' });

            const root = process.cwd();
            const settings = require(path.join(root, 'webpack', 'settings.js'));

            // replacements
            const regexStyles = /\/\/ Route Path/ig; // for styles
            const regexRedux = new RegExp('// Redux here', 'ig'); // for redux

            const pathnm = pathNames.split('/');
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
            const regexStylesString = recursiveStrings.concat(rescurveNames).join('/');

            const pugFile = path.join(root, 'views', 'utils', 'new-page.pug');
            fs.writeFileSync(pugFile, '#app!=serverSideRendering');

            const regexReduxString = reduxRecursive.join('/');

            shell.cp('-R', path.join(__dirname, '..', '..', '..', 'templates', 'redux', 'angular'), path.join(root, 'assets', after, 'redux'))

            fs.writeFileSync(pathNames, str.replace(regexRedux, regexReduxString).replace(regexStyles, `"${regexStylesString}",`));
        },
        vue: (pathNames) => {
            const pathn = path.join(__dirname, '..', '..', '..', 'templates', 'assets', 'page.vue');
            const str = fs.readFileSync(pathn, { encoding: 'utf8' });

            const root = process.cwd();
            const settings = require(path.join(root, 'webpack', 'settings.js'));

            // replacements
            const regexStyles = /\/\/ Route Path/ig; // for styles
            const regexRedux = new RegExp('// Redux here', 'ig'); // for redux

            const pathnm = pathNames.split('/');
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
            const regexStylesString = recursiveStrings.concat(rescurveNames).join('/');

            const pugFile = path.join(root, 'views', 'utils', 'new-page.pug');
            fs.writeFileSync(pugFile, '#app!=serverSideRendering');

            const regexReduxString = reduxRecursive.join('/');

            shell.cp('-R', path.join(__dirname, '..', '..', '..', 'templates', 'redux', 'vue'), path.join(root, 'assets', after, 'redux'))

            fs.writeFileSync(pathNames, str.replace(regexRedux, regexReduxString).replace(regexStyles, `import "${regexStylesString}";`));
        },
        js: (pathNames) => {
            const pathn = path.join(__dirname, '..', '..', '..', 'templates', 'assets', 'page.js');
            const str = fs.readFileSync(pathn, { encoding: 'utf8' });

            const root = process.cwd();
            const settings = require(path.join(root, 'webpack', 'settings.js'));

            // replacements
            const regexStyles = /\/\/ Route Path/ig; // for styles
            const regexRedux = /\/\/ Redux here/ig; // for redux

            const pathnm = pathNames.split('/');
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
            const regexStylesString = recursiveStrings.concat(rescurveNames).join('/');

            const pugFile = path.join(root, 'views', 'utils', 'new-page.pug');
            fs.writeFileSync(pugFile, 'h1(style="text-align: center;") Hello World');

            const regexReduxString = reduxRecursive.join('/');

            shell.cp('-R', path.join(__dirname, '..', '..', '..', 'templates', 'redux', 'js'), path.join(root, 'assets', after, 'redux'));

            fs.writeFileSync(pathNames, str.replace(regexRedux, regexReduxString).replace(regexStyles, `import "${regexStylesString}";`));
        }
    };

    const jsWebpack = {
        'react': {
            'test': '.jsx$',
            'exclude': 'node_modules',
            'use': ['babel-loader'],
        },
        'angular': {
            'test': '.ts$',
            'exclude': 'node_modules',
            'use': ['babel-loader'],
        },
        'vue': {
            'test': '.vue$',
            'exclude': '(node_modules|bower_components)',
            'use': ['vue-loader'],
            'query': {
                'presets': ['es2015', 'stage-2'],
                'plugins': ['transform-runtime'],
                'comments': false,
            },
        },
        'js': {
            'test': '.js$',
            'exclude': 'node_modules',
            'use': ['babel-loader'],
        },
    };

    const packageJsonDependiences = {
        react: {
            "react": "^16.4.2",
            "react-dom": "^16.4.2",
            "react-router": "^4.3.1",
        },
        angular: {
            "@angular/animations": "^6.1.0",
            "@angular/common": "^6.1.0",
            "@angular/compiler": "^6.1.0",
            "@angular/core": "^6.1.0",
            "@angular/forms": "^6.1.0",
            "@angular/http": "^6.1.0",
            "@angular/platform-browser": "^6.1.0",
            "@angular/platform-browser-dynamic": "^6.1.0",
            "@angular/router": "^6.1.0",
            "core-js": "^2.5.4",
            "rxjs": "^6.0.0",
            "zone.js": "~0.8.26"
        },
        vue: {
            "vue": "^2.1.0",
        },
        js: {

        },
    }

    const packageJsonDevDependiences = {
        react: {

        },
        angular: {
            "@angular-devkit/build-angular": "~0.7.0",
            "@angular/cli": "~6.1.3",
            "@angular/compiler-cli": "^6.1.0",
            "@angular/language-service": "^6.1.0",
            "@types/jasmine": "~2.8.6",
            "@types/jasminewd2": "~2.0.3",
            "@types/node": "~8.9.4",
            "codelyzer": "~4.2.1",
            "protractor": "~5.3.0",
            "ts-node": "~5.0.1",
            "tslint": "~5.9.1",
            "typescript": "~2.7.2"
        },
        vue: {
            "vue-loader": "^10.0.0",
            "vue-style-loader": "^1.0.0",
            "vue-template-compiler": "^2.1.0",
        },
        js: {

        }
    }

    const packageJson = require(path.join(root, 'package.json'));
    packageJson.dependiences = Object.assign({}, packageJsonDependiences[type], packageJson.dependiences);
    packageJson.devDependiences = Object.assign({}, packageJsonDevDependiences[type], packageJson.devDependiences);

    const reverseJs = Object.values(TYPING.javascripts).reduce((acc, item) => {
        acc[item] = item;
        return acc;
    }, {});

    const reverseCss = Object.values(TYPING.stylesheets).reduce((acc, item) => {
        acc[item] = item;
        return acc;
    }, {});

    let CURR_JS = '';
    let CURR_CSS = '';

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

    // styles change file path types
    // javascript change full root files
    const arrayOfPaths = (data, pathn) => {
        fs.readdirSync(pathn).forEach(dir => {
            if (fs.lstatSync(path.join(pathn, dir)).isDirectory()) {
                const temp = data;
                arrayOfPaths(temp, path.join(pathn, dir));
            } else {
                data.push(path.join(pathn, dir));
            }
        });

        return data;
    };

    const beforeTypes = arrayOfPaths([], path.join(root, 'assets', before, 'pages'));

    beforeTypes.forEach(dir => {
        const fileArray = dir.split('/');
        const filename = fileArray[fileArray.length - 1].split('.')[0] + '.' + after;
        const newFile = fileArray.slice(0, fileArray.length - 1).join('/') + '/' + filename;

        if (TYPING.javascripts[type] === after) {
            shell.cp(path.join(__dirname, '..', '..', '..', 'templates', 'assets', `page.${after}`), newFile);
            shell.mv(dir, newFile);
            jsStrings[type](newFile);
        } else if (TYPING.stylesheets[type] === after) {
            const jsPaths = dir.replace(RegExp(CURR_CSS, 'ig'), CURR_JS);
            const str = fs.readFileSync(jsPaths, { encoding: 'utf8' });
            fs.writeFileSync(jsPaths, str.replace(RegExp(CURR_CSS, 'ig'), after));
        }
    });

    // Handle webpack here
    if (TYPING.javascripts[before]) {
        settings.jsType = after;
        settings.javascriptSettings = jsWebpack[type];
    } else if (TYPING.stylesheets[before]) {
        settings.styleType = after;
    }

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

    javascripts
    -> js
    -> react
    -> angular
    -> vue

Command:
node-rails settings <command-name> [Options]
    `);
};

module.exports = {
    command,
    description,
    documentation,
};
