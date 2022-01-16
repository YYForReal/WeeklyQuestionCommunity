import Vue from 'vue'
import Router from 'vue-router'
import TabBar from '@/components/TabBar'
import EditArticle from '@/components/EditArticle'
import SpecialArticle from '@/components/SpecialArticle'
import FocusCard from '@/components/ArticleCard/FocusCard'
import RecommendCard from '@/components/ArticleCard/RecommendCard'
import HotCard from '@/components/ArticleCard/HotCard'
import VideoBox from '@/components/ArticleCard/VideoBox'
import Login from '@/components/login'
import setting from '@/components/setting'


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
  routes: [{
      path: '/',
      name: 'TabBar',
      component: TabBar,
      redirect:'/RecommendCard',//重定向
      children: [{
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

    {
      //  开头“/”会被当成根路径
      path: '/EditArticle/:type',
      name: 'EditArticle',
      component: EditArticle,
      props: true,
    },

  ]
})
