const meta = require('../../app.json');
const { serverSide } = require('./serverside');

const webpackHotReloads = (res, application) => {
    const normalizeAssets = (assets) => {
        return Array.isArray(assets) ? assets : [assets];
    };

    if (res.locals.webpackStats && res.locals.webpackStats.toJson && res.locals.webpackStats.toJson().assetsByChunkName) {
        const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;
        const assets = normalizeAssets(assetsByChunkName[application]);

        return assets.reduce((acc, item) => {
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
    const filenameArray = nameArray.slice(1).join('/');
    const filename = '/' + filenameArray;
    const pageName = nameArray[nameArray.length - 1];

    return Object.assign({}, meta, {
        name: pageName.split('').map((e, i) => i === 0 ? e.toUpperCase() : e.toLowerCase()).join(''),
        csrf: req.session.cookie.token,
        host: `${req.protocol}://${req.hostname}${req.port && navtivePorts[req.port] ? '' : `:${req.port || 8080}`}${req.url}`,
        jsFiles: webpackHotReloads(res, filename).js,
        cssFiles: webpackHotReloads(res, filename).css,
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
        res.status(200).render(pageName, globalRenders(pageName, req, res, Object.assign({}, customObject, serverSide(pageName, req))));
    },

};
