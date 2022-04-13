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
    },

  },
  actions:{
    getReviews(state,{url,articleId,type}){
      return new Promise((resolve,reject)=>{
        $.ajax({
          type: "get",
          url,
          async: true,
          data: {
            articleId,type
          },
          success: function (data) {
            // console.log(typeof data, data);
            console.log("1111111111111111111111111,",data);
            // that.reviews = data;
            resolve(data);
          },
          error:function(xhr,errorText){
            reject(errorText);
          }
        });  
      });
    }
  }
})