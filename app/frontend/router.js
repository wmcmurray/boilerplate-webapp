import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from 'ROOT/views/pages/Home.vue';
import Demo from 'ROOT/views/pages/Demo.vue';
import NotFound from 'ROOT/views/pages/404.vue';

Vue.use(VueRouter);

var routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/demo',
    name: 'demo',
    component: Demo
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
    return savedPosition;
  }
});

export default router
