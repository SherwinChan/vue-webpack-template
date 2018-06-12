import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    env: 'production', //运行环境  development || production
    baseURL: '',  //axios的api域名头，
    // minHeight: 200,
    // routers: constantRouterMap, //默认路由
    // addRouters: [], //添加的路由
    // listRows: 15, //分页
    // platform: '',
    // area_id: null,

    userinfo: {
      token: '',
    },
    api: {
      // group: '/admin/Group', //分组
    },
  },
  getters: {
    env: state => state.env,
    baseURL: state => state.baseURL,
    userinfo: state => state.userinfo,
    token: state => state.userinfo.token,
  },
  mutations: {
    setEnv(state, environment) {
      state.env = environment;
    },
    setBaseURL(state,baseURL){
      state.baseURL = baseURL;
    },
    setUserinfo(state, userinfo) {
      state.userinfo = userinfo;
      console.log(state.userinfo)
    },
    // updateAreaId(state, payload) {
    //   state.area_id = payload;
    // },
    // checkPlatform(state) {
    //   let userAgent = (navigator.userAgent || navigator.vendor || window.opera).toLowerCase();
    //   if (/ipad|iphone|ipod/.test(userAgent)) {
    //     state.platform = 'ios';
    //   } else if (/android/.test(userAgent)) {
    //     state.platform = 'android';
    //   } else {
    //     state.platform = 'unknown';
    //   }
    // },
  },
  actions: {
    // getAreaId({
    //   commit
    // }) {
    //   // 获取地区
    //   let area_id = getQueryString('area_id') || 25;
    //   commit('updateAreaId', parseInt(area_id));

    //   function getQueryString(name) {
    //     //获取地址栏url的参数         
    //     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //     var r = window.location.search.substr(1).match(reg);
    //     if (r != null) {
    //       return unescape(r[2]);
    //     }
    //     return null;
    //   }
    // },

    // getMessageCount({
    //   state,
    //   getters,
    //   commit
    // }) {
    //   return new Promise(resolve => {
    //     axios.get(state.api.messageCount, {
    //       params: {
    //         token: getters.token
    //       }
    //     }).then(response => {
    //       if (response.status === 200) {
    //         commit('setMessageCount', parseInt(response.data))
    //         console.log("message_count", getters.message_count)
    //       }
    //     }).then(() => {
    //       resolve()
    //     })
    //   })
    // },
  }
})