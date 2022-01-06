// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';



import './assets/css/iconfont.css'//图标

import './assets/css/answers.css'
import './assets/css/common.css'
//import './assets/css/article.css'
import './assets/css/video.css'


import md5 from 'md5';
import jwt from 'jsonwebtoken';

Vue.prototype.$md5 = md5;
Vue.prototype.$jwt = jwt;




Vue.config.productionTip = false
Vue.use(ElementUI);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
