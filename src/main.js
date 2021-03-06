// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import router from './router'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

require('./assets/css/iconfont.css')//图标
require('./assets/css/common.css')
require('./assets/css/article.css')//文章卡片公共样式
import '@/assets/css/bulma.min.css';
// import "mavon-editor/dist/css/index.css";

import md5 from 'md5';
import util from '@/assets/js/utils.js'

// import jwt from 'jsonwebtoken';
// import mavonEditor from 'mavon-editor'
// import axois from 'axios';
Vue.prototype.$md5 = md5;
Vue.prototype.$util = util;

// Vue.prototype.$http = axois;
// Vue.prototype.$jwt = jwt;
// Vue.prototype.$secret = "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611";
Vue.config.productionTip = false
// Vue.use(ElementUI);
Vue.use(MavonEditor)

var Event = new Vue();//定义一个空的Vue实例
Vue.prototype.$E = Event;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
