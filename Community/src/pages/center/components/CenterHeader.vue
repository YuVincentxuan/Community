<template>
    <div>
<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="_isCollapse">

<el-menu-item index="1">
    <i class="el-icon-menu"></i>
    <span slot="title">我的信息</span>
  </el-menu-item>
  <el-menu-item index="2">
    <i class="el-icon-location"></i>
    <span slot="title">博客管理</span>
  </el-menu-item>
  <el-menu-item index="3">
    <i class="el-icon-document"></i>
    <span slot="title">认证管理</span>
  </el-menu-item>
  <el-menu-item index="4">
    <i class="el-icon-setting"></i>
    <span slot="title">消息通知</span>
  </el-menu-item>
</el-menu>
    </div>
</template>
<script>
export default {
    name:'CenterHeader',
     data() {
      return {
        isCollapse: true
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