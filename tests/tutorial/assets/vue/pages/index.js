import Vue from 'vue'
import Application from './component';
import redux from '../redux/store'

new Vue({
  el: '#app',
  name: 'Root',
  render: h => h(Application),
  state: redux(window.STORAGE || {}),
})
