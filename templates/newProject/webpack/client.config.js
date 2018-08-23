const webpack = require('webpack');
const noProduction = process.env.NODE_ENV !== 'production';
const settings = require('./settings');
const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { reduce } = require('lodash');

const context = path.join(__dirname, '..');
const jsLoader = settings.javascriptSettings;
jsLoader.test = new RegExp(jsLoader.test);
jsLoader.exclude = new RegExp(jsLoader.exclude);

const recursiveFind = (data, pathnm) => {
    fs.readdirSync(pathnm).forEach(dir => {
        if (fs.lstatSync(path.join(pathnm, dir)).isDirectory()) {
            recursiveFind(data, path.join(pathnm, dir));
        } else {
            const fullPath = path.join(pathnm, dir);
            const pageName = dir.split('.')[0];
            data[`${pathnm}/`] = {
                pageName: pageName,
                fullPath: fullPath,
            };
        }
    });

    return data;
};

const styleType = settings.styleType;
const jsType = settings.jsType;
const useBootstrapToggle = settings.useBootstrapToggle;

const cssPath = path.join(context, 'assets', styleType, 'pages');
const jsPath = path.join(context, 'assets', jsType, 'pages');
const docsPath = path.join(context, 'assets', jsType, 'pages', 'docs');

const cssPaths = recursiveFind({}, cssPath);
const jsPaths = Object.assign({}, recursiveFind({}, jsPath), reduce(recursiveFind({}, docsPath), (acc, val, key) => {
    acc[key] = { ...val, docs: true };
    return acc;
}, {}));

const setByRoute = (data, object, assetType) => {
    const obj = data;
    for (let route in object) {
        const cssRegex = new RegExp(cssPath, 'ig');
        const jsRegex = new RegExp(jsPath, 'ig');
        const routePath = route.replace(cssRegex, '').replace(jsRegex, '') + object[route].pageName;

        if (assetType === 'javascript') {
            obj[routePath] = obj[routePath] || [];
            obj[routePath].push('webpack-hot-middleware/client.js');
            if (useBootstrapToggle) {
                for (let setting in settings.bootstrap.scripts) {
                    obj[routePath].push(`${context}/node_modules/bootstrap/js/src/${setting}.js`);
                }
                obj[routePath].push(object[route].fullPath);
            } else {
                obj[routePath].push(object[route].fullPath);
            }
            if (obj[routePath].docs) {
                for (let setting in settings.bootstrap.scripts) {
                    obj[routePath].push(`${context}/node_modules/bootstrap/js/src/${setting}.js`);
                }
                obj[routePath].push(object[route].fullPath);
            }
        } else if (assetType === 'stylesheet') {
            if (useBootstrapToggle) {
                obj[routePath] = obj[routePath] || [];
                obj[routePath].push(`${context}/bootstrap/index.scss`);
                obj[routePath].push(object[route].fullPath);
            } else {
                obj[routePath] = obj[routePath] || [];
                obj[routePath].push(object[route].fullPath);
            }
            if (obj[routePath].docs) {
                obj[routePath] = obj[routePath] || [];
                obj[routePath].push(`${context}/bootstrap/index.scss`);
                obj[routePath].push(object[route].fullPath);
            }
        }
    }
    return obj;
};

const updateArray = (array) => {
    let firstItem = array.shift();
    const jsFiles = array.filter(e => e.endsWith('.js') || e.endsWith('.ts') || e.endsWith('.jsx') || e.endsWith('.vue'));
    const cssFiles = array.filter(e => e.endsWith('.css') || e.endsWith('.scss') || e.endsWith('.sass') || e.endsWith('.less'));
    firstItem = noProduction ? [firstItem] : [];
    return [].concat(firstItem).concat(cssFiles).concat(jsFiles);
};

const bundleJavaScriptLast = (routeObject) => {
    const obj = {};
    for (let route in routeObject) {
        obj[route] = updateArray(routeObject[route]);
    }
    return obj;
};

let withJavascripts = setByRoute({}, jsPaths, 'javascript');
let withStylesheets = setByRoute(withJavascripts, cssPaths, 'stylesheet');

const entry = bundleJavaScriptLast(withStylesheets);

let plugins = [
    new webpack.LoaderOptionsPlugin({
        options: {
            devtools: 'eval-source-map',
        },
    }),
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name]-[id].css',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
];

if (!noProduction) plugins.splice(3, 1);

module.exports = {
    name: 'client',
    mode: noProduction ? 'development' : 'production',
    context: context,
    entry: entry,
    output: {
        path: path.resolve(context, 'assets', 'dist', 'pages'),
        filename: '[name].js',
        publicPath: '/',
    },
    target: 'web',
    module: {
        rules: [
            jsLoader,
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
            },
            {
                test: /\.json$/,
                use: ['json-loader'],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/,
                loader: 'url-loader?name=[name].[ext]&limit=100000',
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.vue', '.json', '.scss', '.sass', '.css', '.less'],
        moduleExtensions: ['-loader'],
    },
    plugins: plugins,
};
