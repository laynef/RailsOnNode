// This file returns your webpack configuriation object
const path = require('path');
const settings = require('./settings');
const { webpackConfiguration } = require('rails-on-node-conductor');


const webpackConfig = webpackConfiguration(settings);
webpackConfig.context = path.join(__dirname, '..');

module.exports = webpackConfig;
