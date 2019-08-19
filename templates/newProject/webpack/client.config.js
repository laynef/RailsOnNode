// This file returns your webpack configuriation object
const settings = require('./settings');
const { webpackConfiguration } = require('rails-on-node-conductor');


module.exports = webpackConfiguration(settings);
