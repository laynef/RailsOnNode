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
            getServersideString(filePath),
        ])
        .then((htmls) => {
            console.log(htmls);
            return {
                serversideStorage: JSON.stringify(store()),
                serversideString: htmls[0],
            };
        })
        .catch(() => {
            return {
                serversideStorage: JSON.stringify(store()),
                serversideString: '',
            };
        });
    },

    getFreshReduxStore: (req) => {
        const assets = path.join(__dirname, '..', '..', 'assets', settings.jsType);
        const store = require(path.join(assets, 'redux', 'store'))(req.session.redux || {});
        return store.getState();
    }

};
