import Vue from 'vue'
import Vuex from 'vuex'

import normal from './modules/normal.js'
import api from './modules/api.js'
import appLogin from './modules/appLogin.js'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    normal,
    api,
    appLogin
  }
})