import Vue from 'vue';
import App from './views/App.vue';
import Router from './router.js';
import Store from './store.js';

// components
import CheckComponent from './views/components/Check.vue'
import LoaderComponent from './views/components/Loader.vue'
import ProgressBarComponent from './views/components/ProgressBar.vue'
import ThreeDotsComponent from './views/components/ThreeDots.vue'

Vue.component('check', CheckComponent);
Vue.component('loader', LoaderComponent);
Vue.component('progress-bar', ProgressBarComponent);
Vue.component('three-dots', ThreeDotsComponent);

const app = new Vue({
  el: '#app',
  router: Router,
  store: Store,
  render: h => h(App)
});
