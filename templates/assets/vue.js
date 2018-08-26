import Vue from 'vue';
import Application from './component';

import createStore from '// Redux here';
const redux = createStore(window.STORAGE);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(Application),
    state: redux,
});
