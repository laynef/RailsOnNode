const handleVueRender = require('./vue');
const handleReactRender = require('./react');
const handleJsRender = require('./js');

module.exports = {
    jsx: handleReactRender,
    vue: handleVueRender,
    js: handleJsRender,
};
