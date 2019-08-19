module.exports = {
    jsx: () => {
        const { Provider } = require('react-redux');
        const { renderToStaticMarkup } = require('react-dom/server');

        return (Component, store) => {
            return renderToStaticMarkup(
                <Provider store={store}>
                    <Component />
                </Provider>
            );
        }
    },
    vue: () => {
        const { createRenderer } = require('vue-server-renderer');

        return (filePath, sharedState, cb) => {
            const component = fs.readFileSync(filePath, { encoding: 'utf8' });
            const template = component.replace(/(?<=\<template)(.*)(?=\>)/g, '').split('<template>')[1].split('</template>')[0];
            const renderer = createRenderer();
            const vue = new Vue({
                data: { sharedState, privateState: {} },
                template,
            });
            return renderer.renderToString(vue, {}, cb);
        }
    },
    js: () => () => {},
};
