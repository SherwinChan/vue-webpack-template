import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import {
  constantRouterMap
} from './router.js'

// 路由配置
const RouterConfig = {
  mode: 'history',
  base: '/app/',
  routes: constantRouterMap
};

export default new VueRouter(RouterConfig);