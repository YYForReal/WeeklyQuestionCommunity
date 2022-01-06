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
Vue.prototype.baseUrl = 'http://localhost:9000'

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
      path: '/SpecialArticle/:articleId',
      name: 'SpecialArticle',
      component: SpecialArticle,

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
