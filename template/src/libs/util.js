import axios from 'axios';
{{#vuex}}import store from '../store';{{/vuex}}
import env from '../config/env';

let util = {

};

let ajaxUrl = 'http://blog.dev.sherwin.com/index.php'; //默认的api地址

{{#vuex}}store.commit('setEnv', env);{{/vuex}}
if (env === 'development') {
  {{#vuex}}
  let server = localStorage.getItem('server');  //server是api的域名地址，如master、dev等
  if (server) {
    let url = 'http://blog.' + server + '.sherwin.com/index.php';  //切换的api地址
    store.commit('setServer', server) //记录server进vuex
    ajaxUrl = url;
  } else {
    // 若无server选项，则本地开发填默认api地址，线上则默认服务器域名地址
    {{/vuex}}ajaxUrl = window.location.hostname == 'localhost' ? 'http://blog.sherwin.com/index.php' : window.location.origin + '/index.php';
    {{#vuex}}
  }{{/vuex}}
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