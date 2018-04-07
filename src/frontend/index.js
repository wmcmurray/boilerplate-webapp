import Vue from 'vue';
import App from 'ROOT/views/App.vue';
import Router from 'ROOT/router.js';
import Store from 'ROOT/store.js';

// components
Vue.component('check', require('ROOT/views/components/Check.vue'));
Vue.component('loader', require('ROOT/views/components/Loader.vue'));
Vue.component('progress-bar', require('ROOT/views/components/ProgressBar.vue'));
Vue.component('three-dots', require('ROOT/views/components/ThreeDots.vue'));

var app = new Vue({
  el: '#app',
  router: Router,
  store: Store,
  render: function render(h) {
    return h(App);
  }
});
