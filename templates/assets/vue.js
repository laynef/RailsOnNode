import Vue from 'vue'
import Application from './component';
import redux from '// Redux here';

new Vue({
  el: '#app',
  render: h => h(Application),
  data: {
    sharedState: redux(window.STORAGE || {}),
    privateState: {},
  },
})
