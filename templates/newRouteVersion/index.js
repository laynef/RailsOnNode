const express = require('express');
const router = express.Router();
const allGets = require('./get');
const allDeletes = require('./delete');
const allPosts = require('./post');
const allPatches = require('./patch');
const allPuts = require('./put');

const versionArray = `${__dirname}`.split('/');
const apiVersion = versionArray[versionArray.length - 1];

const setRoutes = (array, method) => {
    array.forEach(e => {
        let middleware = Array.isArray(e.middleware) && e.middleware.length > 0 ? e.middleware.map(e => Object.values(e)[0]) : [(req, res, next) => { next(); }];
        Promise.all([e.controller])
            .then((controller) => {
                router[method](e.route, ...middleware, (req, res) => controller[0](req, res));
            });
    });
};

setRoutes(allGets, 'get');
setRoutes(allPosts, 'post');
setRoutes(allPatches, 'patch');
setRoutes(allPuts, 'put');
setRoutes(allDeletes, 'delete');

//  API Docs
let docs = []
    .concat(allGets.map(e => ({...e, method: 'GET'})))
    .concat(allPosts.map(e => ({...e, method: 'POST'})))
    .concat(allPatches.map(e => ({...e, method: 'PATCH'})))
    .concat(allPuts.map(e => ({...e, method: 'PUT'})))
    .concat(allDeletes.map(e => ({...e, method: 'DELETE'})))
    .filter(e => !e.ignore)
    .map(e => ({ ...e, route: `/api/${apiVersion}${e.route}`, middleware: e.middleware ? e.middleware.map(e => Object.keys(e)[0]) : ['No Extra Middleware'] }));

const apiObject = {};
apiObject[`${apiVersion}Router`] = router;
apiObject[`${apiVersion}`] = docs;

module.exports = apiObject;
