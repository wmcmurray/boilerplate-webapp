import 'babel-polyfill'

// vendors
import Vue from 'vue'
import VModal from 'vue-js-modal/dist/index.nocss.js'
import VueTippy from 'vue-tippy/src/index-nostyles.js'
import Snotify from 'vue-snotify'

// vendors styles
import 'animate.css/animate.compat.css'
import 'vue-js-modal/dist/styles.css'
import 'tippy.js/index.css'
import 'vue-snotify/styles/material.css'
import 'COMMON/styles/vendors/gridlex.scss'
import 'COMMON/styles/vendors/vue-js-modal.scss'

// register vendors
Vue.use(require('vue-smoothscroll'));
Vue.use(VModal);
Vue.use(VueTippy, {arrow: true, touchHold: true});
Vue.use(Snotify, {toast: {showProgressBar: false, icon: false, position: 'rightTop'}});

// app
import App from 'ROOT/views/App.vue'
import Router from 'ROOT/router.js'
import Store from 'ROOT/store.js'
import I18n from 'ROOT/i18n.js'

// components
import IconComponent from 'COMMON/views/components/Icon.vue'
import CheckComponent from 'COMMON/views/components/Check.vue'
import SpinnerRipplesComponent from 'COMMON/views/components/SpinnerRipples.vue' // or SpinnerClassic
import OverlaySpinnerComponent from 'COMMON/views/components/OverlaySpinner.vue'
import ProgressBarComponent from 'COMMON/views/components/ProgressBar.vue'
import ThreeDotsComponent from 'COMMON/views/components/ThreeDots.vue'
import ImageComponent from 'COMMON/views/components/Image.vue'
import RightClickProtectionComponent from 'COMMON/views/components/RightClickProtection.vue'
import TabsComponent from 'COMMON/views/components/Tabs.vue'
import TabComponent from 'COMMON/views/components/Tab.vue'
import AbstractModalComponent from 'COMMON/views/modals/AbstractModal.vue'

Vue.component('icon', IconComponent);
Vue.component('check', CheckComponent);
Vue.component('spinner', SpinnerRipplesComponent);
Vue.component('overlay-spinner', OverlaySpinnerComponent);
Vue.component('progress-bar', ProgressBarComponent);
Vue.component('three-dots', ThreeDotsComponent);
Vue.component('lazyimg', ImageComponent);
Vue.component('right-click-protection', RightClickProtectionComponent);
Vue.component('tabs', TabsComponent);
Vue.component('tab', TabComponent);
Vue.component('abstract-modal', AbstractModalComponent);

const app = new Vue({
  el      : '#app',
  router  : Router,
  store   : Store,
  i18n    : I18n,
  render(h) {
    return h(App);
  },
});

// register google analytics page views (if GA is loaded somewhere)
Router.afterEach((to, from) => {
  if(typeof ga !== 'undefined'){
    ga('set', 'page', to.path);
    ga('send', 'pageview');
  }
});

export default app
