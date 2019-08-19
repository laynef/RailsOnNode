// This file converts your javascript in to server side code
const settings = require('./settings');
const { handleServerSide } = require('rails-on-node-conductor');


module.exports = handleServerSide(settings);
