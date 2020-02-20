// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import store from './store'
import VueWechatTitle from 'vue-wechat-title'
Vue.use(mavonEditor)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts 
Vue.use(ElementUI);
Vue.use(VueWechatTitle)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render: h => h(App),
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if(to.meta.title){
    document.title = to.meta.title
  }
  if(to.meta.requireAuth){
    //判断该路由是否需要登录权限
    if(sessionStorage.getItem('token')){
      next()//不要再next里面加'path:/',会陷入死循环
    } 
    else{
      next({
        path:'/login',
        query:{redirect: to.fullPath} //将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else{
    next()
  }
  //登录的情况
  if(to.fullPath == "/"){
    if(sessionStorage.getItem('token')){
      next({path:'/'});
    }else{
      next()
    }
  }
})