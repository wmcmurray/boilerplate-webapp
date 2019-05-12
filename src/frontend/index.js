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
import IconComponent from 'ROOT/views/components/Icon.vue'
import CheckComponent from 'ROOT/views/components/Check.vue'
import SpinnerRipplesComponent from 'ROOT/views/components/SpinnerRipples.vue' // or SpinnerClassic
import OverlaySpinnerComponent from 'ROOT/views/components/OverlaySpinner.vue'
import ProgressBarComponent from 'ROOT/views/components/ProgressBar.vue'
import ThreeDotsComponent from 'ROOT/views/components/ThreeDots.vue'
import ImageComponent from 'ROOT/views/components/Image.vue'
import TabsComponent from 'ROOT/views/components/Tabs.vue'
import TabComponent from 'ROOT/views/components/Tab.vue'
import AbstractModalComponent from 'ROOT/views/modals/AbstractModal.vue'

Vue.component('icon', IconComponent);
Vue.component('check', CheckComponent);
Vue.component('spinner', SpinnerRipplesComponent);
Vue.component('overlay-spinner', OverlaySpinnerComponent);
Vue.component('progress-bar', ProgressBarComponent);
Vue.component('three-dots', ThreeDotsComponent);
Vue.component('lazyimg', ImageComponent);
Vue.component('tabs', TabsComponent);
Vue.component('tab', TabComponent);
Vue.component('abstract-modal', AbstractModalComponent);

var app = new Vue({
  el      : '#app',
  router  : Router,
  store   : Store,
  render  : function render(h) {
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
