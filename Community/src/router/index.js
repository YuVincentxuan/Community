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
      component: Home
    },
    {
      path: '/center',
      name: 'Center',
      component: Center
    },
    {
      path:'/blog',
      name:'Blog',
      component:Blog
    },
    {
      path:'/certificate',
      name:'Certificate',
      component:Certificate
    },
    {
      path:'/message',
      name:'Message',
      component:Message
    },
    {
      path:'/user/:id',
      name:'User',
      component:User
    },
    {
      path:'/article/:id',
      name:'Article',
      component:Article
    },
    {
      path:'/write',
      name:'Write',
      component:Write
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/admin',
      name:'Admin',
      component:Admin
    },
    {
      path:'/question',
      name:'Question',
      component:Question
    },
    {
      path:'/direction/:tags',
      name:'Direction',
      component:Direction
    },
    {
      path:'/label/:label',
      name:'Label',
      component:Label
    }
  ]
})

