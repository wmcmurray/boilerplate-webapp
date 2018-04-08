import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from 'ROOT/views/pages/Home.vue';
import Components from 'ROOT/views/pages/Components.vue';
import Api from 'ROOT/views/pages/Api.vue';
import NotFound from 'ROOT/views/pages/404.vue';

Vue.use(VueRouter);

var routes = [
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

var router = new VueRouter({
  routes: routes,
  mode: 'history',
  scrollBehavior: function(to, from, savedPosition){
    // smooth scroll back to top
    if(from.name != to.name){
      var app = router.app.$children[0];
      app.$SmoothScroll(app.$el);
    }

    return savedPosition;
  }
});

export default router
