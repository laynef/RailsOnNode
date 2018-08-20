const meta = require('../../app.json');

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

module.exports = {

    globalRenders: (name, req, res, customs) => {
        meta.keywords = Array.isArray(meta.keywords) ? meta.keywords.join(',') : meta.keywords;

        const navtivePorts = {
            '443': true,
            '80': true,
        };

        const filenameArray = name.split('/').slice(1).join('/');
        const filename = '/' + filenameArray;

        return Object.assign({}, meta, {
            csrf: req.session.cookie.token,
            host: `${req.protocol}://${req.hostname}${req.port && navtivePorts[req.port] ? '' : `:${req.port || 8080}`}${req.url}`,
            jsFiles: webpackHotReloads(res, filename).js,
            cssFiles: webpackHotReloads(res, filename).css,
        }, customs);
    },

    makeHash: (hashLength) => {
        let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        let temp = '';
        for (let i = 0; i < hashLength; i++) {
            temp += characters[Math.floor(Math.random() * characters.length)];
        }
        return temp;
    },

};
