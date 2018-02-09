try {
    window.$ = window.jQuery = require('jquery');
} catch (e) {}

/* Инициализация Vue */
import Vue from 'vue'

/* Подключаем компоненты */

import VueResource from 'vue-resource'
import topadvert from './vue/components/Topadvert.vue'    

Vue.use(VueResource)

/* eslint-disable no-new */

new Vue({
  el: '#app',
  components: { topadvert }
})

require ('./components/main-menu.js');
require ('./components/font_loader.js');
require ('./components/navigation.js');
require ('./components/service-worker.js');