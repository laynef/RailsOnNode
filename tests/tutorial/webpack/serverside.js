const Vue = require('vue');
const { createRenderer } = require('vue-server-renderer');

module.exports = (filePath) => {
    const renderer = createRenderer();
    const vue = new Vue({ render: h => h(require(filePath)) });
    return renderer.renderToString(vue, {})
        .then((html) => html)
        .catch(() => '');
};
