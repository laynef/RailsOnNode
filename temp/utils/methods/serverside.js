const path = require('path');
const settings = require('../../webpack/settings');

module.exports = {

    serverSide: (pageName, req) => {
        const assets = path.join(__dirname, '..', '..', 'assets', settings.jsType, 'redux', 'store');
        const store = require(assets);
        req.session.redux = req.session.redux || store();

        return {
            serversideStorage: JSON.stringify(req.session.redux),
        };
    },

};
