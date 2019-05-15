const Vue = require('vue');
const fs = require('fs');
const { createRenderer } = require('vue-server-renderer');

module.exports = (filePath, sharedState, cb) => {
    const component = fs.readFileSync(filePath, { encoding: 'utf8' });
    const template = component.replace(/(?<=<template)(.*)(?=>)/g, '').split('<template>')[1].split('</template>')[0];
    const renderer = createRenderer();
    const vue = new Vue({
        data: { sharedState, privateState: {} },
        template,
    });
    return renderer.renderToString(vue, {}, cb);
}

