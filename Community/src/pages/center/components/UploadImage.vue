<template>
  <div>
    <div class="show-info">
      <div class="test test1">
        <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            canMove="true"
            canMoveBox="true"
            :fixedBox="option.fixedBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :centerBox="option.centerBox"
            :high="option.high"
            :infoTrue="option.infoTrue"
            @realTime="realTime"
            @imgLoad="imgLoad"
            @cropMoving="cropMoving"
            :enlarge="option.enlarge"
        ></vueCropper>
      </div>
      <div class="model" v-show="model">
        <div class="model-show" @click="model = false">
          <img :src="modelSrc" alt="" @click="model = false">
        </div>
      </div>
      <div class="test-button">
        <label class="btn" for="uploads"><i class="el-icon-picture-outline"></i></label>
        <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
        <button @click="refreshCrop" class="btn"><i class="el-icon-refresh"></i></button>
        <button @click="changeScale(1)" class="btn"><i class="el-icon-zoom-in"></i></button>
        <button @click="changeScale(-1)" class="btn"><i class="el-icon-zoom-out"></i></button>
        <button @click="rotateLeft" class="btn"><i class="el-icon-refresh-left"></i></button>
        <button @click="rotateRight" class="btn"><i class="el-icon-refresh-right"></i></button>
        <button @click="finish('base64')" class="btn"><i class="el-icon-view"></i></button>
        <!-- <button @click="finish('blob')" class="btn">preview(blob)</button> -->
        <a @click="down('base64')" class="btn"><i class="el-icon-download"></i></a>
        <!-- <a @click="down('blob')" class="btn">download(blob)</a> -->
        <a :href="downImg" download="demo.png" ref="downloadDom"></a>
        <button @click="uploadHeaderImg" class="btn danger-btn"><i class="el-icon-upload2"></i></button>
      </div>
    </div>
  </div>
</template>
<script>
  import { VueCropper }  from 'vue-cropper'
 export default {
    name:'UploadImage',
    components: {
        VueCropper,
    },
    data() {
      return {
            model: false,
            modelSrc: "",
            crap: false,
            previews: {},
            downImg:'#',
            option:{
                img:'',
                size: 1,
                outputType:'jpg',
                full:false,
                canMove:true,
                canMoveBox:true,
                fixedBox:true,
                original:false,
                autoCrop:true,
                autoCropWidth:'100%',
                autoCropHeight:'100%',
                centerBox:true,
                high:true,
                infoTrue:false,
                enlarge:1,
            }
        } 
    },
    methods: {
    changeImg() {
      this.option.img = this.lists[~~(Math.random() * this.lists.length)].img;
    },
    startCrop() {
      // start
      this.crap = true;
      this.$refs.cropper.startCrop();
    },
    stopCrop() {
      //  stop
      this.crap = false;
      this.$refs.cropper.stopCrop();
    },
    clearCrop() {
      // clear
      this.$refs.cropper.clearCrop();
    },
    refreshCrop() {
      // clear
      this.$refs.cropper.refresh();
    },
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    finish(type) {
      // 输出
      // var test = window.open('about:blank')
      // test.document.body.innerHTML = '图片生成中..'
      if (type === "blob") {
        this.$refs.cropper.getCropBlob(data => {
          var img = window.URL.createObjectURL(data);
          this.model = true;
          this.modelSrc = img;
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.model = true;
          this.modelSrc = data;
        });
      }
    },
    // 实时预览函数
    realTime(data) {
      var previews = data;
      var h = 0.5;
      var w = 0.2;

      this.previewStyle1 = {
        width: previews.w + "px",
        height: previews.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: h
      };

      this.previewStyle2 = {
        width: previews.w + "px",
        height: previews.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: w
      };

      this.previewStyle3 = {
        width: previews.w + "px",
        height: previews.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: (100 / previews.w)
      };

      this.previewStyle4 = {
        width: previews.w + "px",
        height: previews.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: (100 / previews.h)        
      };

			this.previews = data;
    },
    down(type) {
      // event.preventDefault()
      // 输出
      if (type === "blob") {
        this.$refs.cropper.getCropBlob(data => {
            console.log(data)
          this.downImg = window.URL.createObjectURL(data);
          if (window.navigator.msSaveBlob) {
            var blobObject = new Blob([data]);
            window.navigator.msSaveBlob(blobObject, "demo.png");
          } else {
            this.$nextTick(() => {
              this.$refs.downloadDom.click();
            });
          }
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.downImg = data;
          if (window.navigator.msSaveBlob) {
            var blobObject = new Blob([data]);
            window.navigator.msSaveBlob(blobObject, "demo.png");
          } else {
            this.$nextTick(() => {
              this.$refs.downloadDom.click();
            });
          }
        });
      }
    },
    uploadImg(e, num) {
      //上传图片
      // this.option.img
      var file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          this.option.img = data;
        } else if (num === 2) {
          this.example2.img = data;
        }
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    imgLoad(msg) {
      console.log(msg);
    },
    uploadHeaderImg(){
      this.$refs.cropper.getCropData(data => {
        this.$emit('upload',data)
      })
      
    },
    cropMoving(data) {
      this.option.cropData = data;
    }
  },

 }
</script>

<style lang="less">
  .cropper-crop-box{
      height: 100px !important;
      width:100px !important;
  }
  .show-info{
    width: 100%;
    height:100%;
    display: flex;
  }
  .test{
      flex:  1 0 0;
      width: 100%;
      height:100%;
  }
.test-button {
  flex:  0 1 0;
  flex-direction: row;
  justify-content:space-between;
  margin: 0 10px;
}
.btn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #c0ccda;
  color: #1f2d3d;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0px 0px 10px 20px;
  padding: 9px 15px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #50bfff;
  border-color: #50bfff;
  transition: all 0.2s ease;
  text-decoration: none;
  user-select: none;
}
.danger-btn{
  background-color: #F56C6C;
  border-color: #F56C6C;
}
.des {
  line-height: 30px;
}

.show-info {
  margin-bottom: 50px;
}

.show-info h2 {
  line-height: 50px;
}

/*.title, .title:hover, .title-focus, .title:visited {
		color: black;
	}*/

.title {
  display: block;
  text-decoration: none;
  text-align: center;
  line-height: 1.5;
  margin: 20px 0px;
  background-image: -webkit-linear-gradient(
    left,
    #3498db,
    #f47920 10%,
    #d71345 20%,
    #f7acbc 30%,
    #ffd400 40%,
    #3498db 50%,
    #f47920 60%,
    #d71345 70%,
    #f7acbc 80%,
    #ffd400 90%,
    #3498db
  );
  color: transparent;
  -webkit-background-clip: text;
  background-size: 200% 100%;
  animation: slide 5s infinite linear;
  font-size: 40px;
}

.test {
  height: 500px;
}

.model {
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
}

.model-show {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  text-align: center;
}

.model img {
  display: block;
  margin: auto;
  max-width: 80%;
  width: auto;
  user-select: none;
  background-position: 0px 0px, 10px 10px;
  background-size: 20px 20px;
  background-image: linear-gradient(
      45deg,
      #eee 25%,
      transparent 25%,
      transparent 75%,
      #eee 75%,
      #eee 100%
    ),
    linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
}

.c-item {
  display: block;
  padding: 10px 0;
  user-select: none;
}

.pre {
	display: flex;
}

.pre-item {
	padding-right: 20px;
}

@keyframes slide {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}

@media screen and (max-width: 1000px) {
  .content {
    max-width: 90%;
    margin: auto;
  }

  .test {
    height: 400px;
  }
}
</style>