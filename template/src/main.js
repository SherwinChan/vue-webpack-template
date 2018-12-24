{{#babel-polyfill}}
// 转换es6新的api
import 'babel-polyfill';{{/babel-polyfill}}
import Vue from 'vue';
{{#router}}import router from './router/index.js';{{/router}}{{#vuex}}
import store from './store';{{/vuex}}
import Util from './libs/util';

// import 'element-ui/lib/theme-chalk/index.css'
// import ElementUI from 'element-ui';
// Vue.use(ElementUI)

// import {
//   MessageBox,
//   Toast,
//   Indicator,
// } from 'mint-ui';

// Vue.prototype.$MessageBox = MessageBox; //注册$http = axios
// Vue.prototype.$Toast = Toast; //注册$http = axios
// Vue.prototype.$Indicator = Indicator; //注册$http = axios

// import LoadingBar from 'iview';
// // 讲本项目所用到的iview组件的css抽离出来
// import './assets/css/iview-split.css';

// import 'muse-ui/lib/styles/base.less';
// import { Button, Select } from 'muse-ui';
// import 'muse-ui/lib/styles/theme.less';

// Vue.use(Button);
// Vue.use(Select);

// // 字体图片icomoon
// import './assets/icomoon/style.css';

// 图片懒加载
// require('./assets/js/lazyload')


import App from './app.vue';


//自定义全局组件
// import LoadingSpinner from './components/loadingspinner.vue'
// Vue.component('loading-spinner', LoadingSpinner)

//axios配置
let axios = Util.ajax;
Vue.prototype.$http = axios; //注册$http = axios
// axios.defaults.withCredentials = true; //开启资格证书cookie
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  
  // config.timeout = 60000; //60秒超时
  return config;
}, function (error) {
  console.log(error)
  // Do something with request error
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  // Do something with response data
  console.log("response success")
  console.log(response)

  return response;
}, function (error) {

  console.log("response error")
  // Do something with response error
  console.log(error)
  console.log(error.code)
  console.log(error.request)
  console.log('Error', error.message);
  console.log(error.config);
  let error_message = '服务器繁忙，请刷新页面重试！';
  if (error.response) {
    console.log(error.response)
    console.log(error.response.data);
    console.log(error.response.status);
    // console.log(error.response.headers['x-info']);
    // if (error.response.headers['x-info'] != undefined && error.response.headers['x-info'] != '') {
    //   error_message = decodeURIComponent(error.response.headers['x-info']);
    //   error_message = (error_message == 'token过期') ? '登录已过期，请重新登录' : error_message;
    // }
    switch (error.response.status) {
      case 404:
        // Toast({
        //   message: error_message,
        //   position: 'bottom',
        //   duration: 1500
        // });
        break;
      case 401:
        // ElementUI.Notification.error({
        //   title: error_message || '登录已过期，请重新登录',
        // });
        // store.commit('updateUserinfo', {})
        break;
      case 500:
        // ElementUI.Notification.error({
        //   title: error_message || '服务器繁忙，请刷新页面重试！',
        // });
        break;
      default:
        break;
    }
    console.log(error_message)
  } else if (error.message) {
    if (error.message.toLowerCase().indexOf('timeout') >= 0) {
      error_message = '服务器长时间未响应，请刷新页面重试！';
      // ElementUI.Notification.error({
      //   title: error_message,
      //   duration: 10000
      // });
    } else if (error.message.toLowerCase().indexOf('abort') >= 0) {
      // error_message = '服务器连接中断 abort！';
      // ElementUI.Notification.error({
      //   title: error_message,
      //   duration: 10000
      // });
    }

  } else {
    // ElementUI.Notification.error({
    //   title: error_message,
    //   duration: 10000
    // });
  }

  return Promise.reject(error);
});


// 全局mixin
Vue.mixin({
  methods: {
    formatTimestamp(_timestamp, format) {
      if (_timestamp) {
        let _chuo = _timestamp.toString() + '000';
        let normal_date;
        let times = new Date(Number(_chuo));
        let time_Y = times.getFullYear();
        let time_M = (times.getMonth() + 1 < 10 ? '0' + (times.getMonth() + 1) : times.getMonth() + 1);
        let time_D = (times.getDate() < 10 ? '0' + times.getDate() : times.getDate());
        let time_h = (times.getHours() < 10 ? '0' + times.getHours() : times.getHours());
        let time_m = (times.getMinutes() < 10 ? '0' + times.getMinutes() : times.getMinutes());
        let time_s = (times.getSeconds() < 10 ? '0' + times.getSeconds() : times.getSeconds());
        // normal_date = time_Y + "-" + time_M + "-" + time_D;
        normal_date = `${time_Y}-${time_M}-${time_D}`
        if (format === 'minute') {
          normal_date = `${time_Y}-${time_M}-${time_D}    ${time_h}:${time_m}`
        }
        return normal_date;
      }
      return ''
    }
  },
})

{{#router}}
router.beforeEach((to, from, next) => {
  console.log(to, from)
  // LoadingBar.start();
  next();
});
router.afterEach((to, from, next) => {
  // LoadingBar.finish();
  // window.scrollTo(0, 0)
});
{{/router}}

new Vue({
  el: '#app',{{#router}}
  router: router,{{/router}}{{#vuex}}
  store: store,{{/vuex}}
  render: h => h(App)
});