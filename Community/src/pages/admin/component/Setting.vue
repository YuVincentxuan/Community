<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>首页幻灯展示</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div class="block" >
                <el-carousel trigger="click">
                    <el-carousel-item v-for="(item,index) in image" :key="index" >
                        <el-upload
                            class="upload"
                            :limit="1"
                            action="#"
                            list-type="picture-card"
                            :auto-upload="false">
                        <i slot="default" class="el-icon-plus"></i>
                            <!-- <div v-show="false" :index="index" slot="file" slot-scope="{file}">
                                {{changeImg(file.url)}}
                            </div> -->
                            <div class="uploadBtn" @click="clickCarousel(index)"></div>
                        </el-upload>
                        <h3 class="small">余文轩</h3>
                        <el-image class="image"
                            fit="cover"
                            style="width: 100%; height: 100%"
                            :src="item"
        
                        >
                        </el-image>  
                    </el-carousel-item>
                </el-carousel>
            </div>
        </el-card>
        <el-image class="image"
            fit="cover"
            style="width: 100px; height: 100px"
            :src="item"
        >
        </el-image>  
    </div>
</template>
<script>
export default {
    name:'AdminSetting',
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        activeIndex: 0,
        item:'',
        image:[
            'https://ae01.alicdn.com/kf/Hc5db71654f844faa91db3e28fd83dfc7W.jpg',
            'https://pic.superbed.cn/item/5d9b3400451253d178f23d10.jpg',
            'https://pic.superbed.cn/item/5d9aeff7451253d178e9bca2.jpg',
            'https://ae01.alicdn.com/kf/H50c11d0a714c45019af061be843ddebdm.jpg'
        ]
      }
    },
    props: {
        time: {
            type: Number,
            default: 2
        },
        value: {
            type: Number,
            default: 600
        }
    },
    methods: {
        handleRemove(file) {
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {

        },
        uploadSucc(res,file,fileList,index){

        },
        beforUpload(file,index){

        },
        handleChange(file, fileList) {
            
            let index = this.activeIndex
            if (window.FileReader) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                //监听文件读取结束后事件
                    // console.log(123)

                reader.onloadend= function (e) {

                    this.image[index] = e.target.result   //e.target.result就是最后的路径地址
                };
            }
            
        },
        clickCarousel(index){
            this.activeIndex = index
            console.log(this.image)
        },
        changeImg(src){
            console.log(src)
            let index = this.activeIndex 
            console.log(index)
            this.image[index] = src
            this.item = src
            console.log( this.image[index] )
           
        }
    
    }
//     mounted () {
//         this.numberGrow(this.$refs.numberGrow)
//   }
}
</script>
<style lang="stylus" scoped>
.text {
    font-size: 14px;
}
.item {
    margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
.el-carousel__item h3 {
    position absolute
    color: red;
    font-size: 28px;
    text-align center
    z-index 10
    line-height 300px
    left 0
    right 0
    top 0
    bottom 0
    margin 0 auto 
}
.image{
    position absolute
}
.upload{
    position absolute
    z-index 20
    background-color rgba(0,0,0,0)
    height 100%
    width 100%
}
.el-upload--picture-card{
    background-color rgba(0,0,0,0) !important 
    width 100%
    height 100%
}
.el-upload{
    height 100%
    width 100%
}
.uploadBtn{
    position relative
    z-index 9999
    width 100%
    height 100%
}
.number-grow-warp{
  transform: translateZ(0);
}
.number-grow {
  font-family: Arial-BoldMT;
  font-size: 64px;
  color: #ffaf00;
  letter-spacing: 2.67px;
  margin:110px 0 20px;
  display: block;
  line-height:64px;
}

</style>