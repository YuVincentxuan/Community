<template>
    <div class="content">
      <el-carousel :interval="4000" trigger="click" type="card" :height="_height">
        <el-carousel-item v-for="(item,index) in images" :key="index">
          <div class="title">
            <div class="title-item">
              <h3 class="small">{{item.direction}}</h3>

            </div>
          </div>
          <el-image 
            class="image"
            fit="cover"
            style="width: 100%; height: 100%"
            :src="item.imageUrl"
            @click.native="goToUrl(item.articleUrl)"
          >
          </el-image>
      
        </el-carousel-item>
      </el-carousel>
      <home-article></home-article>
      <my-footer></my-footer>
    </div>
</template>
<script>
import axios from 'axios'
import HomeArticle from './components/Article'
import myFooter from '../myFooter'
export default {
    name:'Home',
    components:{
      HomeArticle,
      myFooter
    },
    data(){
      return{
        images:[],
       
      }
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
    methods:{
      goToUrl(url){
        this.$router.push(url)
      },
      getFourImage(){
        axios.get('http://blog.swpuiot.com/getFourImage')
        .then(this.getFourImageSucc)
      },
      getFourImageSucc(res){
        res = res.data
        if(res.code == 200){
          this.images = res.data
        }
      }
    },
    mounted() {
      this.getFourImage()
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
.title{
    position absolute
    z-index 10
    width 100%
    height 100%
    vertical-align middle
}
title-item{
  position relative
  width 100%
  height 100%
}
.el-carousel__item h3{
  text-align center
  height 28px
  width 100%
  position absolute
  line-height 28px;
  color: #409eef;
  font-size: 28px;
  left 0
  right 0
  top 0
  bottom 0
  margin auto 
  opacity: 1;
}
.image{
    position absolute
}
</style>