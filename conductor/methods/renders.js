const { renderServerSide } = require('./serverside');
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
    const meta = global.meta;
    meta.keywords = Array.isArray(meta.keywords) ? meta.keywords.join(',') : meta.keywords;

    const nameArray = name.split('/');
    const filenameArray = nameArray.slice(1);
    const pageName = filenameArray.pop();

    let files = null;
    if (pageName === 'index') files = 'index';
    else if (customs && customs.statusCode >= 400) files = `errors${customs.statusCode}`;
    else files = camelCase(filenameArray.map(e => e.replace(RegExp(':', 'ig'), '')).join(' '));

    const hostName = `${req.protocol}://${req.get('host')}`;

    return Object.assign({}, meta, {
        name: pageName.split('').map((e, i) => i === 0 ? e.toUpperCase() : e.toLowerCase()).join(''),
        csrf: req.session.cookie.token,
        host: `${hostName}${req.url}`,
        jsFiles: webpackHotReloads(res, files).js,
        cssFiles: webpackHotReloads(res, files).css,
        filePath: files,
        environment: process.env.NODE_ENV,
        hostName,
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

const getServerSideRendering = async (req, res, pageName) => {
    let storage = {};
    try {
        const { serverSide } = renderServerSide(global.settings);
        const storage = await serverSide(pageName, req);
        return globalRenders(pageName, req, res, storage);
    } catch (error) {
        return globalRenders(pageName, req, res, storage);
    }
};


module.exports = {

    globalRenders,
    makeHash,
    getServerSideRendering,

    render: (pageName, customObject = {}) => async (req, res) => {
        try {
            const statusCode = customObject && customObject.statusCode ? customObject.statusCode : 200;
            const htmlObject = await getServerSideRendering(req, res, pageName);
            res.status(statusCode).render(pageName, Object.assign({}, customObject, htmlObject));
        } catch (error) {
            return error;
        }
    },

    renderError: async (req, res, pageName, customObject = {}) => {
        try {
            const errorCode = customObject && customObject.statusCode ? customObject.statusCode : 400;
            const htmlObject = await getServerSideRendering(req, res, pageName);
            res.status(errorCode).render(pageName, Object.assign({}, customObject, htmlObject));
        } catch (error) {
            return error;
        }
    },

};
