import Vue from 'vue'
import Router from 'vue-router'
import TabBar from '@/components/TabBar'
import EditArticle from '@/components/EditArticle'
import SpecialArticle from '@/components/SpecialArticle'
import FocusCard from '@/components/ArticleCard/FocusCard'
import RecommendCard from '@/components/ArticleCard/RecommendCard'
import HotCard from '@/components/ArticleCard/HotCard'
import VideoBox from '@/components/ArticleCard/VideoBox'



Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'TabBar',
      component: TabBar,
      children: [
        {
          path: '/FocusCard/:userId',
          name: 'FocusCard',
          component: FocusCard,
          props:true,
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
      //  开头“/”会被当成根路径
      path: '/EditArticle/:authorId',
      name: 'EditArticle',
      component: EditArticle,
      props:true,
    },
  ]
})
