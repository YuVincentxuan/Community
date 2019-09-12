<template>
    <div class="content">
      <el-carousel :interval="4000" trigger="click" type="card" :height="_height">
        <el-carousel-item v-for="item in 4" :key="item">
          <el-image 
            fit="cover"
             style="width: 100%; height: 100%"
            src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
          >
          </el-image>
        </el-carousel-item>
      </el-carousel>
      <home-article></home-article>
    </div>
</template>
<script>
import HomeArticle from './components/Article'
export default {
    name:'Home',
    components:{
      HomeArticle
    },
    computed: {
      _height:function(){
          if(document.body.clientWidth <= 667){
            return '150px'
          }else{
              return '400px'
          }
      }
    },
}
</script>
<style lang="stylus" scoped>
.content{
  background-color #f4f5f5
  position relative
  top 60px
}
.el-carousel__container{
  height 400px
}
 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>