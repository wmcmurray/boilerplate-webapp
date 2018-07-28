import 'babel-polyfill'

import Vue from 'vue'
import VModal from 'vue-js-modal'
import VueTippy from 'vue-tippy'
import Snotify from 'vue-snotify/vue-snotify.min.js' // because there is ES6 syntax inside commonjs module
import App from 'ROOT/views/App.vue'
import Router from 'ROOT/router.js'
import Store from 'ROOT/store.js'


// vendors
Vue.use(require('vue-smoothscroll'));
Vue.use(VModal);
Vue.use(VueTippy, {arrow: true, touchHold: true});
Vue.use(Snotify, {toast: {showProgressBar: false, icon: false, position: 'rightTop'}});

// components
Vue.component('icon', require('ROOT/views/components/Icon.vue'));
Vue.component('check', require('ROOT/views/components/Check.vue'));
Vue.component('spinner', require('ROOT/views/components/SpinnerRipples.vue')); // or SpinnerClassic
Vue.component('overlay-spinner', require('ROOT/views/components/OverlaySpinner.vue'));
Vue.component('progress-bar', require('ROOT/views/components/ProgressBar.vue'));
Vue.component('three-dots', require('ROOT/views/components/ThreeDots.vue'));
Vue.component('lazyimg', require('ROOT/views/components/Image.vue'));
Vue.component('tabs', require('ROOT/views/components/Tabs.vue'));
Vue.component('tab', require('ROOT/views/components/Tab.vue'));
Vue.component('abstract-modal', require('ROOT/views/modals/AbstractModal.vue'));

var app = new Vue({
  el: '#app',
  router: Router,
  store: Store,
  render: function render(h) {
    return h(App);
  }
});

// register google analytics page views (if GA is loaded somewhere)
Router.afterEach(function(to, from){
  if(typeof ga !== 'undefined'){
    ga('set', 'page', to.path);
    ga('send', 'pageview');
  }
});

export default app
