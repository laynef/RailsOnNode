const express = require('express');
const conductor = require('rails-on-node-conductor');
const gets = require('./get');
const deletes = require('./delete');
const posts = require('./post');
const patchs = require('./patch');
const puts = require('./put');


const router = conductor.setAsyncRoutes(express.Router(), { gets, deletes, posts, patchs, puts });
const apiVersion = conductor.getApiVersion(__dirname);
const documentation = conductor.getDocumentationForRouter(apiVersion, { gets, deletes, posts, patchs, puts });

module.exports = returnRouter({ apiVersion, documentation, router });
