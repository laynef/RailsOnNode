const express = require('express');
const { decorateApp } = require('@awaitjs/express');
const router = decorateApp(express.Router());
const allGets = require('./get');
const allDeletes = require('./delete');
const allPosts = require('./post');
const allPatches = require('./patch');
const allPuts = require('./put');

const versionArray = `${__dirname}`.split('/');
const apiVersion = versionArray[versionArray.length - 1];

const setRoutes = (array, method) => {
    array.forEach(e => {
        let middleware = Array.isArray(e.middleware) && e.middleware.length > 0 ? e.middleware.map(el => Object.values(el)[0]) : [(req, res, next) => { next(); }];
        router[`${method.toLowerCase()}Async`](e.route, ...middleware, e.controller);
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
    .map(e => ({ ...e, route: `/api/${apiVersion}${e.route}`, middleware: e.middleware ? e.middleware.map(el => Object.keys(el)[0]) : ['No Extra Middleware'] }));

const apiObject = {};
apiObject[`${apiVersion}Router`] = router;
apiObject[`${apiVersion}`] = docs;

module.exports = apiObject;
