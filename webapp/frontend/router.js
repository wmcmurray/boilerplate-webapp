import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './views/pages/Home.vue';
import Demo from './views/pages/Demo.vue';
import NotFound from './views/pages/404.vue';

Vue.use(VueRouter);

var routes = [
  { path: '/', component: Home },
  { path: '/demo', component: Demo },
  { path: '*', component: NotFound },
];

var router = new VueRouter({
  routes: routes,
  mode: 'history',
  scrollBehavior: function(to, from, savedPosition){
    return savedPosition;
  }
});

export default router
