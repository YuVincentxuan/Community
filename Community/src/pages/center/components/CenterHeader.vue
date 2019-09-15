<template>
    <div>
<el-menu :default-active="activeIndex" class="el-menu-vertical-demo" router @open="handleOpen" @close="handleClose" :collapse="_isCollapse">

<el-menu-item v-for="(item,i) in navList" :key="i" :index="item.navItem">
    <i :class="item.navIcon"></i>
    <span slot="title">{{item.navName}}</span>
  </el-menu-item>
</el-menu>
    </div>
</template>
<script>
export default {
    name:'CenterHeader',
     data() {
      return {
        isCollapse: true,
        activeIndex:'1',
        navList:[
          {
            navName:'我的信息',
            navItem:'/center',
            navIcon:'el-icon-location'
          },
          {
            navName:'博客管理',
            navItem:'/blog',
            navIcon:'el-icon-location'
          },
          {
            navName:'认证管理',
            navItem:'/certificate',
            navIcon:'el-icon-document'
          },
          {
            navName:'消息通知',
            navItem:'/message',
            navIcon:'el-icon-setting'
          },
        ]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    computed: {
        _isCollapse:function(){
          if(document.body.clientWidth <= 667){
            return true
          }else{
              return false
          }
      }
    },
}
</script>
<style lang="stylus" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
    min-height: 200px;
    margin-bottom 10px
  }

   @media screen and (max-width: 1200px) {
        .el-menu{
            width 100%
            float left
        }
       .el-menu-item{
           float left
           width 25%
           text-align center
       }
   }
  
</style>