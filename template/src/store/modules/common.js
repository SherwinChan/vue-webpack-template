const state = {
  listRows: 15,
  env: 'production', //运行环境  development || production
  baseURL: '', //axios的api域名头，http://ymtpartybuild.dev.sj33333.com/app
}

const mutations = {
  setEnv(state, environment) {
    state.env = environment;
  },
  setBaseURL(state, baseURL) {
    state.baseURL = baseURL;
  },
}

export default {
  state,
  mutations
}