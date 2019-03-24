const meta = require('../../app.json');
const { serverSide } = require('./serverside');
const { camelCase } = require('lodash');

const webpackHotReloads = (res, application) => {

    const normalizeAssets = (assets) => {
        return Array.isArray(assets) ? assets : [assets];
    };

    if (res.locals.webpackStats && res.locals.webpackStats.toJson && res.locals.webpackStats.toJson().assetsByChunkName) {
        const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;

        const assets = normalizeAssets(assetsByChunkName[application]);

        return assets.filter(e => !!e).reduce((acc, item) => {
            if (item.endsWith('.js')) acc.js.push(item);
            if (item.endsWith('.css')) acc.css.push(item);
            return acc;
        }, { js: [], css: [] });
    } else {
        return { js: [], css: [] };
    }
};

const globalRenders = (name, req, res, customs) => {
    meta.keywords = Array.isArray(meta.keywords) ? meta.keywords.join(',') : meta.keywords;

    const navtivePorts = {
        '443': true,
        '80': true,
    };

    const nameArray = name.split('/');
    const filenameArray = nameArray.slice(1);
    const pageName = filenameArray.pop();

    let files = null;
    if (pageName === 'index') files = 'index';
    else if (customs && customs.statusCode >= 400) files = `errors${customs.statusCode}`;
    else files = camelCase(filenameArray.map(e => e.replace(RegExp(':', 'ig'), '')).join(' '));

    return Object.assign({}, meta, {
        name: pageName.split('').map((e, i) => i === 0 ? e.toUpperCase() : e.toLowerCase()).join(''),
        csrf: req.session.cookie.token,
        host: `${req.protocol}://${req.hostname}${req.port && navtivePorts[req.port] ? '' : `:${req.port || 8080}`}${req.url}`,
        jsFiles: webpackHotReloads(res, files).js,
        cssFiles: webpackHotReloads(res, files).css,
        filePath: files,
        environment: process.env.NODE_ENV,
    }, customs);
};

const makeHash = (hashLength) => {
    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let temp = '';
    for (let i = 0; i < hashLength; i++) {
        temp += characters[Math.floor(Math.random() * characters.length)];
    }
    return temp;
};

module.exports = {

    globalRenders,
    makeHash,

    render: (pageName, customObject = {}) => (req, res) => {
        const statusCode = customObject && customObject.statusCode ? customObject.statusCode : 200;
        res.status(statusCode).render(pageName, globalRenders(pageName, req, res, Object.assign({}, customObject, serverSide(pageName, req))));
    },

    renderError: (req, res, pageName, customObject = {}) => {
        const errorCode = customObject && customObject.statusCode ? customObject.statusCode : 400;
        const statusCode = process.env.NODE_ENV === 'production' ? errorCode : 202;
        res.status(statusCode).render(pageName, globalRenders(pageName, req, res, Object.assign({}, customObject, serverSide(`pages/${pageName}/${errorCode}`, req))));
    },

};
