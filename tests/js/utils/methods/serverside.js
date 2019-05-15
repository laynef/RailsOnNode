const path = require('path');
const settings = require('../../webpack/settings');

module.exports = {

    serverSide: (pageName, req) => {
        const assets = path.join(__dirname, '..', '..', 'assets', settings.jsType, 'redux', 'store');
        const store = require(assets);
        req.session.redux = store(req.session.redux || {});

        return {
            serversideStorage: JSON.stringify(req.session.redux),
        };
    },

    getFreshReduxStore: (req) => {
        const assets = path.join(__dirname, '..', '..', 'assets', settings.jsType);
        const store = require(path.join(assets, 'redux', 'store'))(req.session.redux || {});
        return store.getState();
    },

};
