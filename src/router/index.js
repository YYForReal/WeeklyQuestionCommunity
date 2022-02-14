import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main'
import EditArticle from '@/components/edit/EditArticle'
import SpecialArticle from '@/views/SpecialArticle'
import FocusCard from '@/components/ArticleCard/FocusCard'
import RecommendCard from '@/components/ArticleCard/RecommendCard'
import HotCard from '@/components/ArticleCard/HotCard'
import VideoBox from '@/components/ArticleCard/VideoBox'
import Login from '@/views/Login'
import setting from '@/components/user/setting'


Vue.use(Router)

//118.31.165.150
//localhost
Vue.prototype.baseUrl = 'http://118.31.165.150:9000'

// 获取原型对象上的push函数
const originalPush = Router.prototype.push;
// 修改原型对象上的push方法
Router.prototype.push = function push(location){
  return originalPush.call(this,location).catch(err=> err);
}


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      redirect:'/RecommendCard',//重定向
      children: [
        {
          //  开头“/”会被当成根路径
          path: '/EditArticle/:type',
          name: 'EditArticle',
          component: EditArticle,
          props: true,
        },
        {
          path: '/FocusCard/:userId',
          name: 'FocusCard',
          component: FocusCard,
          props: true,
        },
        {
          path: '/RecommendCard',
          name: 'RecommendCard',
          component: RecommendCard
        },
        {
          path: '/HotCard',
          name: 'HotCard',
          component: HotCard
        },
        {
          path: '/VideoBox',
          name: 'VideoBox',
          component: VideoBox
        },

      ]
    },
    {
      path: '/SpecialArticle/:articleId',
      name: 'SpecialArticle',
      component: SpecialArticle,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting
    },



  ]
})
