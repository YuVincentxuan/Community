<template>
  <div id="app">
    <my-header></my-header>
    <router-view/>
  </div>
</template>

<script>
import myHeader from './pages/myHeader'
export default {
  name: 'App',
  components:{
    myHeader
  }
}
</script>

<style>
body {
    margin: 0;
    padding: 0;
    color: rgb(151, 151, 151);
    background-color: #f4f5f5;
    /* min-width: 1200px; */
}
ul,li{
  list-style: none;
  padding-inline-start: 0;
  margin-block-start: 0;
  margin-block-end: 0;
} 
h3{
   margin-block-start: 0;
   margin-block-end:0
}  
a{
  cursor: pointer;
}
.el-collapse-item__content{
  padding-bottom: 0;
  padding: 10px 30px;
}
.el-collapse-item__header{
  font-size: 16px;
  padding: 0 10px;
}
.el-collapse-item__header.is-active{
  font-weight: bold
}
.el-tabs__nav-scroll{
  position: relative;
}
.el-tabs__nav.is-top{
  position: relative;
  width: 100%;
  text-align: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.el-tabs__header{
  margin:0
}
.el-tabs__active-bar{
  display: none;
}
.el-tabs__item.is-active {
    color:#fff;
    border-radius: 5px; 
    background-color: #409EFF;
    transform: translateX(0px)
}
.el-tabs__item{
  text-align: center;
  width :70px;
  padding: 0;
  margin: 5px
}


</style>
