import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home/Home'
import Center from '../pages/center/Center'
import Blog from '../pages/center/Blog'
import Certificate from '../pages/center/Certificate'
import Message from '../pages/center/Message'
import User from '../pages/user/User'
import Article from '../pages/article/Article'
import Write from '../pages/write/Write'
import Login from '../pages/login/Login'
import Admin from '../pages/admin/Admin'
import Question from '../pages/question/Question'
import Direction from '../pages/direction/Direction'
import Label from '../pages/label/Label'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta:{
        title:'翼灵社区'
      }
    },
    {
      path: '/center',
      name: 'Center',
      component: Center,
      meta:{
        title:'翼灵社区-个人中心',
        requireAuth:true
      }
    },
    {
      path:'/blog',
      name:'Blog',
      component:Blog,
      meta:{
        title:'翼灵社区-文章管理',
        requireAuth:true
      }
    },
    {
      path:'/certificate',
      name:'Certificate',
      component:Certificate,
      meta:{
        title:'翼灵社区-用户认证',
        requireAuth:true
      }
    },
    {
      path:'/message',
      name:'Message',
      component:Message,
      meta:{
        title:'翼灵社区-消息通知',
        requireAuth:true
      }
    },
    {
      path:'/user/:id',
      name:'User',
      component:User,
      meta:{
        title:'翼灵社区-作者空间'
      }
    },
    {
      path:'/article/:id',
      name:'Article',
      component:Article,
      meta:{
        title:'翼灵社区-文章',
        requireAuth:true
      }
    },
    {
      path:'/write/:articleId',
      name:'Write',
      component:Write,
      meta:{
        title:'翼灵社区-创作中心',
        requireAuth:true
      }
    },
    {
      path:'/login',
      name:'Login',
      component:Login,
      meta:{
        title:'欢迎来到翼灵社区-使用进行QQ登录'
      }
    },
    {
      path:'/admin',
      name:'Admin',
      component:Admin,
      meta:{
        title:'翼灵社区-管理中心',
        requireAuth:true
      }
    },
    {
      path:'/question',
      name:'Question',
      component:Question,
      meta:{
        title:'翼灵社区-社区问答'
      }
    },
    {
      path:'/direction/:tags',
      name:'Direction',
      component:Direction,
      meta:{
        title:'方向文章'
      }
    },
    {
      path:'/label/:label',
      name:'Label',
      component:Label,
      meta:{
        title:'标签分类文章'
      }
    },
    {
      path:'/**',
      redirect:'/'
    }
  ]
})

