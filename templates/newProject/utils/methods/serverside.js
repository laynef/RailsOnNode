const path = require('path');
const settings = require('../../webpack/settings');

module.exports = {

    serverSide: async (pageName, req) => {
        const assets = path.join(__dirname, '..', '..', 'assets', settings.jsType, 'storage', 'store');
        const store = require(assets);
        try {
            let storage = await global.client.getAsync(req.session.id);
            storage = JSON.parse(storage);
            return { serversideStorage: JSON.stringify(store(storage)) };
        } catch (e) {
            return { serversideStorage: JSON.stringify(store({})) };
        }
    },

    getFreshStore: (req) => {
        const assets = path.join(__dirname, '..', '..', 'assets', settings.jsType);
        const store = require(path.join(assets, 'storage', 'store'))({});
        const storage = store.getState();
        global.client.set(req.session.id, JSON.stringify(storage));
        return storage;
    },

};
