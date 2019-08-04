const path = require('path');
const settings = require('../../webpack/settings');


module.exports = {

    serverSide: async (pageName, req) => {
        const assets = path.join(__dirname, '..', '..', 'assets', settings.jsType);
        const store = require(path.join(assets, 'state', 'store'));
        const getServersideString = require('../../webpack/serverside');

        const assetPath = path.join(assets, pageName);
        const fileArray = assetPath.split('/');
        fileArray.pop();
        const filePath = fileArray.join('/') + '/component.vue';

        try {
            let state = await global.redis.getAsync(req.session.id);
            state = !!state ? JSON.parse(state) : store();
            const serversideString = await getServersideString(filePath, state);
            return {
                serversideStorage: JSON.stringify(state),
                serversideString: serversideString,
            }
        } catch(e) {
            return {
                serversideStorage: JSON.stringify({}),
                serversideString: '',
            }
        }
    },

    getFreshStore: (req) => {
        const assets = path.join(__dirname, '..', '..', 'assets', settings.jsType);
        const createStore = require(path.join(assets, 'state', 'store'));
        const store = createStore({});
        global.redis.set(req.session.id, store);
        return store;
    },

};
