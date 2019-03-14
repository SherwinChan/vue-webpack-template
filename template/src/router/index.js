import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import {
  constantRouterMap
} from './router.js'

// 路由配置
const router = new VueRouter({
  mode: 'history',
  base: '/app/',
  routes: constantRouterMap
})

router.beforeEach((to, from, next) => {
  console.log(to, from)
  // LoadingBar.start();
  next();
});

router.afterEach((to, from, next) => {
  // LoadingBar.finish();
  // window.scrollTo(0, 0)
});

export default router;