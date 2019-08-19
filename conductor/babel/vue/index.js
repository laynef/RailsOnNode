const fs = require('fs');
const path = require('path');


module.exports = (settings) => () => {
    const babelrc = JSON.parse(fs.readFileSync(path.join(settings.context, '.babelrc')))
    require('babel-register')(babelrc);
    const Vue = require('vue');
    const { createRenderer } = require('vue-server-renderer');

    return (filePath, sharedState) => {
        const component = fs.readFileSync(filePath, { encoding: 'utf8' });
        const template = component.replace(/(?<=\<template)(.*)(?=\>)/g, '').split('<template>')[1].split('</template>')[0];
        const renderer = createRenderer();
        const vue = new Vue({
            data: { sharedState, privateState: {} },
            template,
        });
        return renderer.renderToString(vue, {});
    }
};
