// import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    isLogin: false,
    userInfo: null,
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setLogin(state,isLogin){
      state.isLogin = isLogin;
    },
    setUserInfo(state,userInfo){
      state.userInfo = userInfo;
    }
  }
})