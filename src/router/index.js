// import Vue from 'vue'
// import Router from 'vue-router'
import Main from '@/views/Main'
//动态路由引入
const FocusCard = ()=> import('@/components/ArticleCard/FocusCard')
const EditArticle =()=> import ('@/components/edit/EditArticle')
const SpecialArticle = ()=> import ('@/views/SpecialArticle')
const HotCard = ()=> import('@/components/ArticleCard/HotCard')
const VideoBox = () => import('@/components/Video/VideoBox')
const Person = () => import('@/views/Person')
const NoFoundComponent = ()=> import('@/components/NoFoundComponent')
const ArticleList = ()=> import ('@/views/ArticleList')
const Login = ()=> import ('@/views/Login')
const RecommendList = ()=> import ('@/components/ArticleCard/RecommendList')


Vue.use(VueRouter)

//118.31.165.150
//localhost
Vue.prototype.baseUrl = 'http://118.31.165.150:9630'


const router = new VueRouter({
  mode: 'history',
  base:'/community',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      redirect:'/articleList',//重定向
      children: [
        {
          path:'/articleList',
          name:'ArticleList',
          component:ArticleList,
          redirect:'/articleList/recommend',
          children:[
            {
              path: 'FocusCard',
              name: 'FocusCard',
              component: FocusCard,
            },
            {
              path: 'recommend',
              name: 'RecommendList',
              component: RecommendList
            },
            {
              path: 'hotlist',
              name: 'HotCard',
              component: HotCard
            },
          ]
        },
        {
          //  开头“/”会被当成根路径
          path: '/EditArticle/:type',
          name: 'EditArticle',
          component: EditArticle,
          meta:{'title':'问答天地--编辑页面'},
          props: true,
        },
        {
          path: '/video',
          name: 'VideoBox',
          component: VideoBox
        },
        {
          path: '/person',
          name: 'Person',
          component: Person,
          meta:{'title':'问答天地--个人主页'},
        },
        {
          path: '/article/:articleId',
          name: 'SpecialArticle',
          component: SpecialArticle,
        },

      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path:'*',
      name:'NoFoundComponent',
      component: NoFoundComponent,
    }
  ]
})





// 切换路由后将滚动条移至最顶部
router.afterEach((to) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  document.title = to.meta.title || '问答天地';
})



export default router;