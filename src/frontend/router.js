import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from 'ROOT/views/pages/Home.vue'
import Components from 'ROOT/views/pages/Components.vue'
import Api from 'ROOT/views/pages/Api.vue'
import NotFound from 'ROOT/views/pages/404.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/samples/components',
    name: 'components',
    component: Components
  },
  {
    path: '/samples/api',
    name: 'api',
    component: Api
  },
  {
    path: '*',
    component: NotFound
  },
];

const router = new VueRouter({
  routes: routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition){
    // smooth scroll back to top
    if(from.name != to.name){
      const app = router.app.$children[0];

      // because I handle the scroll to hash elsewhere (see ScrollToHash mixin)
      if(!to.hash) {
        app.$SmoothScroll(app.$el);
      }
    }

    return savedPosition;
  }
});

export default router
