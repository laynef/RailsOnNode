// This file converts your javascript in to server side code
const { handleServerSide } = require('rails-on-node-conductor');


module.exports = handleServerSide(global.settings);
