const path = require('path');
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
            