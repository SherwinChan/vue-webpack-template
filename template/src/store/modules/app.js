export default {
  
  state: {
    area_id: null,
    isWeixin: false,
    platform: '',
    sjapp: false,
    userinfo: {
      token: '',
    },
  },
  getters: {
    userinfo: state => state.userinfo,
    token: state => state.userinfo.token,
  },
  mutations: {
    checkWx(state) {
      const userAgent = navigator.userAgent.toLowerCase();
      state.isWeixin = /micromessenger/.test(userAgent);
    },
    checkPlatform(state) {
      let userAgent = (navigator.userAgent || navigator.vendor || window.opera).toLowerCase();
      if (/ipad|iphone|ipod/.test(userAgent)) {
        state.platform = 'ios';
      } else if (/android/.test(userAgent)) {
        state.platform = 'android';
      } else {
        state.platform = 'unknown';
      }
    },
    updateUserinfo(state, userinfo) {
      state.userinfo = userinfo;
    },
    updateSjapp(state, payload) {
      state.sjapp = payload;
    },
  },
  actions: {
    getAreaId({
      commit
    }) {
      let area_id = getQueryString('area_id') || 25;
      commit('updateAreaId', parseInt(area_id));

      function getQueryString(name) {
        //获取地址栏url的参数         
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
          return unescape(r[2]);
        }
        return null;
      }
    },
    checkSjapp({
      commit
    }) {
      let userAgent = (navigator.userAgent || navigator.vendor || window.opera).toLowerCase();
      let uaReg = new RegExp('yimentong|sjapp', 'g');
      let result = uaReg.test(userAgent);
      commit('updateSjapp', result)
      commit('checkPlatform');
    },
    checkLogin({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        if (state.sjapp) {
          // ios有300ms的延迟 handler检测
          let timeout = 0;
          if (state.platform === 'ios') timeout = 300;
          setTimeout(() => {
            window.jsbHandler.callHandler({
              event: 'checkLoginHandler',
              params: {},
              callback: function (rpdata) {
                // 一门通是state_code：登录200; 安卓未登录204，ios未登录302， 智慧龙江是status_code：登录200; 安卓未登录500，ios未登录200？
                // 目前登录了必定有userInfo，未登录没有该字段
                console.log(rpdata)
                let response = rpdata;
                if (typeof response === 'string') {
                  response = JSON.parse(rpdata)
                }
                if (response.userInfo && (response.state_code == 200 || response.status_code == 200)) {
                  // 登录成功
                  commit('updateUserinfo', response.userInfo);
                  resolve();
                } else {
                  // 登陆失败
                  reject();
                }
              }
            });
          }, timeout)
        } else {
          // 测试token
          if (state.env !== 'production') {
            commit('updateUserinfo', {
              // token: '779140a15c7f053ff60adcf839b508e0'
            });
          }
          // reject();
          resolve();
        }

      })
    }
  }
}