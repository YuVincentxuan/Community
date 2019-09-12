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
</style>
