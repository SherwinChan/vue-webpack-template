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
    listRows: 15, //分页

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
  },
  actions: {
    // setMinHeight({
    //   state
    // }) {
    //   console.log("change resize minHeight")
    //   if (state.can_change_height) {
    //     state.can_change_height = false;
    //     const all_h = document.documentElement.clientHeight || window.innerHeight;
    //     state.minHeight = all_h;
    //     console.log(state.minHeight)
    //     setTimeout(function () {
    //       state.can_change_height = true;
    //       const all_h = document.documentElement.clientHeight || window.innerHeight;
    //       state.minHeight = all_h;
    //     }, 1000)
    //   }
    // },
  }
})