const path = require('path');
const settings = require('../../webpack/settings');


module.exports = {

    serverSide: (pageName, req) => {
        const assets = path.join(__dirname, '..', '..', 'assets', settings.jsType);
        const store = require(path.join(assets, 'redux', 'store'));
        req.session.state = req.session.state || store();
        const getServersideString = require('../../webpack/serverside');

        const assetPath = path.join(assets, pageName);
        const fileArray = assetPath.split('/');
        fileArray.pop();
        const filePath = fileArray.join('/') + '/component.vue';

        return Promise.all([
            getServersideString(filePath, req.session.state),
        ])
            .then((htmls) => ({
                serversideStorage: JSON.stringify(req.session.state || {}),
                serversideString: htmls[0],
            }))
            .catch(() => ({
                serversideStorage: JSON.stringify({}),
                serversideString: '',
            }));
    },

    getFreshStore: (req) => {
        const assets = path.join(__dirname, '..', '..', 'assets', settings.jsType);
        const store = require(path.join(assets, 'redux', 'store'))(req.session.state || {});
        return store.getState();
    },

};
