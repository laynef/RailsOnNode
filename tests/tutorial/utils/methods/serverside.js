const path = require('path');
const settings = require('../../webpack/settings');


module.exports = {

    serverSide: async (pageName, req) => {
        const assets = path.join(__dirname, '..', '..', 'assets', settings.jsType);
        const createStore = require(path.join(assets, 'redux', 'store'));
        const componentArray = pageName.split('/');
        componentArray.pop();
        const componentPath = componentArray.join('/') + '/component';

        const Application = require(path.join(assets, componentPath));

        try {
            let redux = await global.client.getAsync(req.session.id);
            redux = !!redux ? JSON.parse(redux) : null;
            const store = createStore(redux);
            redux = redux || store.getState();

            const getServersideString = require('../../webpack/serverside');

            return {
                serversideStorage: JSON.stringify(redux),
                serversideString: getServersideString(Application, store),
            };
        } catch (e) {
            return {
                serversideStorage: JSON.stringify({}),
                serversideString: getServersideString(Application, store),
            };
        }
    },

    getFreshStore: (req) => {
        const assets = path.join(__dirname, '..', '..', 'assets', settings.jsType);
        const createStore = require(path.join(assets, 'redux', 'store'));
        const store = createStore({});
        const storage = store.getState();
        global.client.set(req.session.id, JSON.stringify(storage));
        return storage;
    }

};
