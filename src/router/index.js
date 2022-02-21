// import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main'
import RecommendCard from '@/components/ArticleCard/RecommendCard'
import Login from '@/views/Login'
//动态路由引入
const FocusCard = ()=> import('@/components/ArticleCard/FocusCard')
const EditArticle =()=> import ('@/components/edit/EditArticle')
const SpecialArticle = ()=> import ('@/views/SpecialArticle')
const HotCard = ()=> import('@/components/ArticleCard/HotCard')
const VideoBox = () => import('@/components/ArticleCard/VideoBox')
const setting = () => import('@/components/user/setting')

Vue.use(Router)

//118.31.165.150
//localhost
Vue.prototype.baseUrl = 'http://118.31.165.150:9630'

// 获取原型对象上的push函数
const originalPush = Router.prototype.push;
// 修改原型对象上的push方法
Router.prototype.push = function push(location){
  return originalPush.call(this,location).catch(err=> err);
}


const router = new Router({
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
          path: '/FocusCard',
          name: 'FocusCard',
          component: FocusCard,
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

      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },

  ]
})
// 切换路由后将滚动条移至最顶部
router.afterEach(() => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})
export default router;