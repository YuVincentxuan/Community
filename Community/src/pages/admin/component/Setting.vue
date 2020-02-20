<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>首页幻灯展示</span>
                <div style="float: right; padding: 3px 0">
                <el-select  v-model="directionId" @change="getDirectionIamge(directionId)" placeholder="请选择方向">
                    <el-option label="前端" value="1"></el-option>
                    <el-option label="后端" value="2"></el-option>
                    <el-option label="嵌入式" value="3"></el-option>  
                    <el-option label="安卓" value="4"></el-option>                        
                </el-select>
                <el-button style="margin-left:5px" type="danger" @click="setDirectionImage(directionId)">保存</el-button>

                </div>
            </div>
            <div class="block" >
                <el-carousel trigger="click">
                    <el-carousel-item v-for="(item,index) in image" :key="index" >
                        <div class="upload">
                            <input class="upload" type="file" @change="getFile($event, index)" style="opacity:0;" />
                            <div class="upload-btn">
                                <i class="el-icon-picture-outline upload-btn-item"></i>
                            </div>
                        </div>
                        <!-- <h3 class="small">余文轩</h3> -->
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
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'AdminSetting',
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        activeIndex: 0,
        item:'',
        dataUrl:'',
        directionId:'',
        image:[],
        // image:[
        //     'https://ae01.alicdn.com/kf/Hc5db71654f844faa91db3e28fd83dfc7W.jpg',
        //     'https://pic.superbed.cn/item/5d9b3400451253d178f23d10.jpg',
        //     'https://pic.superbed.cn/item/5d9aeff7451253d178e9bca2.jpg',
        //     'https://ae01.alicdn.com/kf/H50c11d0a714c45019af061be843ddebdm.jpg'
        // ],
        uploadImg:'',
        articleUrl:[]
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
        getFile(el, index){
            let file= el.target.files[0]
            var reader = new FileReader();
            const windowURL = window.URL || window.webkitURL;
            this.image[index] = windowURL.createObjectURL(file);
            var img = document.getElementsByClassName('image');
            img[index].getElementsByTagName('img')[0].src = windowURL.createObjectURL(file)
            reader.readAsDataURL(file);//读取图像文件 result 为 DataURL, DataURL 可直接 赋值给 img.src
            let _this = this
            reader.onload = function(event){
                let base64 = event.target.result;//base64
                _this.image[index] = base64
            }
        },
        getDirectionIamge(id){
            axios.get('http://blog.swpuiot.com/getDirectionImageByAdmin?directionId='+id)
            .then(res => {
                res = res.data
                if(res.code == 200){
                    let _this = this
                    res.data.forEach(function(item, index){
                        _this.image[index] = item.imageUrl
                        _this.articleUrl[index] = item.articleUrl
                    })
                    // for(let i=0; i<res.data.length; i++){
                    //     this.image[i] = res.data[i].imageUrl
                    //     this.articleUrl[i] = res.data[i].articleUrl
                    // }
                }
            })
        },
        setDirectionImage(id){
            let params = new URLSearchParams();
            params.append('images',this.image)
            params.append('directionId',id),
            params.append('articleUrl',this.articleUrl)
            axios.post('http://blog.swpuiot.com/setDirectionImageByAdmin',params)
            .then(res => {
                res = res.data
                if(res.code == 200){
                    this.$message({
                        type:'success',
                        message:'banner上传成功'
                    })
                }
            })
        }
    },
    mounted () {
        this.getDirectionIamge(1)
  }
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
.upload-btn{
    text-align center
    height 100%
    line-height 300px
}
.upload-btn-item{
    font-size 50px
    color #409EFF
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