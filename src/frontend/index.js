import Vue from 'vue';
import App from 'ROOT/views/App.vue';
import Router from 'ROOT/router.js';
import Store from 'ROOT/store.js';

// components
import CheckComponent from 'ROOT/views/components/Check.vue'
import LoaderComponent from 'ROOT/views/components/Loader.vue'
import ProgressBarComponent from 'ROOT/views/components/ProgressBar.vue'
import ThreeDotsComponent from 'ROOT/views/components/ThreeDots.vue'

Vue.component('check', CheckComponent);
Vue.component('loader', LoaderComponent);
Vue.component('progress-bar', ProgressBarComponent);
Vue.component('three-dots', ThreeDotsComponent);

var app = new Vue({
  el: '#app',
  router: Router,
  store: Store,
  render: function render(h) {
    return h(App);
  }
});
