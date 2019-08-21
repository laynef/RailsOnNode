// This file returns your webpack configuriation object
const path = require('path');
const settings = require('./settings');
const { webpackConfiguration } = require('rails-on-node-conductor');


settings.context = path.join(__dirname, '..', '..');
const webpackConfig = webpackConfiguration(settings);

module.exports = webpackConfig;
