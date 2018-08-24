const path = require('path');
const settings = require('../../webpack/settings');

module.exports = {

    serverSide: (pageName, req) => {
        let assets = path.join(__dirname, '..', '..', 'assets', settings.jsType);
        req.session.redux = req.session.redux || require(path.join(assets, 'redux', 'store'))();
        let route = {};
        let pathRoute = assets += '/pages' + req.url + '/' + pageName;
        route[req.url] = require(pathRoute);
        return {
            serversideStorage: req.session.redux,
        };
    },

};
