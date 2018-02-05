import axios from 'axios';
{{#vuex}}import store from '../store';{{/vuex}}
import env from '../config/env';

let util = {

};

let ajaxUrl = 'http://blog.dev.sherwin.com/index.php'; //默认的api地址

{{#vuex}}store.commit('setEnv', env);{{/vuex}}
if (env === 'development') {
  ajaxUrl = window.location.hostname == 'localhost' ? ajaxUrl : window.location.origin + '/index.php';
} else {
  if (env === 'production') {
    // 生产环境的api以服务器域名地址为准
    ajaxUrl = window.location.origin + '/index.php';
  }
}
{{#vuex}}
store.commit('setBaseURL', ajaxUrl) //记录baseURL进vuex
{{/vuex}}
axios.defaults.baseURL = ajaxUrl; //设置axios的baseURL
util.ajax = axios;

export default util;