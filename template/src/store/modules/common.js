import Vue from 'vue'
import Vuex from 'vuex'

import common from './modules/common.js'
import api from './modules/api.js'
import app from './modules/app.js'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    common,
    api,
    app
  }
})