<template>
    <div>
        <div class="center-bg" :style="styles">
            <div class="my-header-img">
                <el-avatar class="header-img" :size="100" :src="userList.headimg"></el-avatar>
                <span class="my-name">{{userList.username}}</span>
            </div>
            <div class="btn-box">
                <el-button :size="_size" @click="myInfoShow =!myInfoShow" plain>编辑资料</el-button>
                <el-button :size="_size" @click="dialogVisible = true" plain>上传头像</el-button>
            </div>
      
        </div>
        <el-dialog
            title="上传头像"
            :visible.sync="dialogVisible"
            :top="'5vh'"
            :width="_width">
            <upload-image @upload="uploadImg"></upload-image>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="uploadImg,dialogVisible = false">确 定</el-button>
            </span> -->
        </el-dialog>
        <div class="my-info" v-show="myInfoShow">
            <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="18">
                    <ul class="info-list">
                        <li class="info-list-item">    
                            <span class="info-title"><i class="iconfont el-icon-user-solid"></i>信息</span>{{information}}
                        </li>
                        <li class="info-list-item">    
                            <span class="info-title"><i class="iconfont el-icon-user-solid"></i>生日</span>{{birthday}}
                        </li>
                        <li class="info-list-item">
                            <span class="info-title"><i class="iconfont el-icon-star-on"></i>电话</span>{{telNumber}}
                        </li>
                        <li class="info-list-item">  
                            <span class="info-title"> <i class="iconfont el-icon-s-cooperation"></i>签名</span>{{signature}}
                        </li>
                        <li class="info-list-item">  
                            <span class="info-title"> <i class="iconfont el-icon-s-promotion"></i>邮箱</span>{{email}}
                        </li>
                    </ul>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="6">
                    <ul class="my-data">
                        <li class="my-data-item">
                            <h4 class="my-data-title">文章</h4>
                            <span class="my-data-num">{{userList.articleNumber}}</span>
                        </li>
                        <li class="my-data-item">
                            <h4 class="my-data-title">提问</h4>
                            <span class="my-data-num">{{userList.questionNumber}}</span>
                        </li>
                        <li class="my-data-item">
                            <h4 class="my-data-title">回答</h4>
                            <span class="my-data-num">{{userList.answerNumber}}</span>
                        </li>
                    </ul>
                </el-col>
            </el-row>
             <el-row :gutter="50">
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <div class="my-follow">
                        <div class="my-follow-header">
                            <h4>我的关注</h4>
                            <span>{{followingNumber}}</span>
                        </div>
                        <div class="people-list">
                            <el-avatar v-for="(item, index) in follower" :key="index" @click.native="goToUser(item.noticerId)"  class="people-header-img"  :size="50" :src="item.noticerImageUrl"></el-avatar>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <div class="my-follow">
                        <div class="my-follow-header">
                            <h4>我的粉丝</h4>
                            <span>{{followedNumber}}</span>
                        </div>
                        <div class="people-list">
                            <el-avatar v-for="(item, index) in fans" :key="index" class="people-header-img" :size="50" @click.native="goToUser(item.followerId)" :src="item.followerImageUrl"></el-avatar>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="my-info" v-show="!myInfoShow">
            <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <div class="my-info-change">
                        <h3>个人资料</h3>
                        <ul class="my-info-list">
                            <li class="info-list-item">
                                <span class="list-title">用户名</span>
                                <el-input v-model="userName" class="my-Info-input" placeholder="请输入内容"></el-input>
                            </li>
                            <li class="info-list-item">
                                <span class="list-title">信息</span>
                                <el-input v-model="information" class="my-Info-input" placeholder="请输入内容"></el-input>
                            </li>                            
                            <li class="info-list-item">
                                <span class="list-title">生日</span>
                                    <el-date-picker
                                        v-model="birthday"
                                        type="date"
                                        placeholder="选择日期">
                                    </el-date-picker>
                            </li>
                            <li class="info-list-item">
                                <span class="list-title">电话</span>
                                <el-input v-model="telNumber" class="my-Info-input" placeholder="请输入内容"></el-input>
                            </li>
                            <li class="info-list-item">
                                <span class="list-title">签名</span>
                                <el-input v-model="signature" class="my-Info-input" placeholder="请输入内容"></el-input>
                            </li>
                            <li class="info-list-item">
                                <span class="list-title">邮箱</span>
                                <el-input v-model="email" class="my-Info-input" placeholder="请输入内容"></el-input>
                            </li>
                    
                        </ul>
                        <el-button :size="_size" class="saveBtn" @click="changeInfo" plain>保存</el-button>
                    </div>

                </el-col>
            </el-row>
        </div>
    </div>

</template>
<script>
import axios from 'axios'
import UploadImage from './UploadImage'
export default {
    name:'CenterTab',
    components:{
        UploadImage
    },
    data(){
        return{
            userList:{},
            dialogVisible:false,
            myInfoShow:true,
            headimg:'',
            userName:'',
            signature:'',
            birthday:'',
            userHobby:'',
            telNumber:'',
            email:'',
            job:'',
            information:'',
            followingNumber:0,
            followedNumber:0,
            follower:[],
            fans:[],
            bgImg:'https://ae01.alicdn.com/kf/Hdd856ae4c81545d2b51fa0c209f7aa28Z.jpg',
            styles:{
                backgroundImage:''
            }
        }
    },
    methods:{
        changeInfo(){
            let params = new URLSearchParams();
            params.append('userName',this.userName)
            params.append('signature',this.signature)
            params.append('birthday',this.birthday)
            params.append('email',this.email)
            params.append('information',this.information)
            axios.post('http://blog.swpuiot.com/editData',params,{
                headers:{
                  'Authorization':'test'  
                }
            })
            .then(res => {
                res = res.data
                if(res.code == 200){
                    this.myInfoShow = !this.myInfoShow;
                    this.$message({
                        type: 'info',
                        message: '修改资料成功'
                    });   
                }
            })
            
        },
        goToUser(id){
            this.$router.push('/user/'+id)
        },
        uploadImg(val){
            console.log(val)
            let params = new URLSearchParams();
            params.append('img',val)
            axios.post('http://blog.swpuiot.com/uploadImage',params)
            .then(res => {
                res = res.data
                if(res.code == 200){
                    this.dialogVisible = false;
                }
            })
        }, 
        getFans(){
            axios.get('http://blog.swpuiot.com/fans?rows=6&pageNum=1',{
                headers:{
                  'Authorization':'test'  
                }
            })
            .then(res => {
                res = res.data
                if(res.code == 200){
                    this.followedNumber = res.FollowedNumber
                    this.fans = res.data
                }
            })
        },
        getFollower(){
            axios.get('http://blog.swpuiot.com/getAttention?rows=6&pageNum=1',{
                headers:{
                  'Authorization':'test'  
                }
            })
            .then(res => {
                res = res.data
                if(res.code == 200){
                    this.follower = res.data
                    this.followingNumber = res.FollowingNumber
                }
            })
        },
        user(){
            axios.get('http://blog.swpuiot.com/user/information',{
                headers:{
                  'Authorization':'test'  
                }
            })
            .then(this.userSucc)
        },
        userSucc(res){
            res = res.data
            if(res.code == 200){
                this.userList = res
                this.information = res.information
                this.birthday = res.birthday
                this.telNumber = res.telNumber
                this.email = res.email
                this.job = res.job
            }
        }
    },
    computed:{
        _size:function(){
        if(document.body.clientWidth <= 667){
            return 'mini'
          }else{
              return 'medium'
          }
        },
         _width:function(){
        if(document.body.clientWidth <= 667){
            return '100%'
          }else{
              return '30%'
          }
        }
    },
    mounted() {
        this.getFans()
        this.getFollower()
        this.user()
    //    let _this=this;
    //    let userList = {...this._props}
        // console.log(this.userList)
    },
    watch:{
      userList(newValue,oldValue){
        this.styles.backgroundImage = 'url('+newValue.headimg+')'
        this.userName = newValue.username
        this.userSign = newValue.userSign
        this.birthday = newValue.birthday
        this.telNumber = newValue.telNumber
        this.userJob = newValue.job
        this.userEmail = newValue.email
      }
    }

}
</script>
<style lang="stylus" scoped>
    .center-bg
        position relative
        height 100px
        width 100%
        background-color white
        background-repeat no-repeat
        background-size cover
        background-position center center
        box-sizing:border-box
        z-index 1
        &:after
            position absolute
            content ''
            height 100%
            width 100%
            left 0
            top 0
            background: inherit
            filter:blur(2px)
            z-index 2
        .my-header-img
            position relative
            display inline-block
            top 30%
            left 5%
            z-index 10
            .header-img
                vertical-align middle
            .my-name
                position relative
                width 100%
                font-size 16px
                color #000
                font-weight bold
                top 10px
                margin 0 20px
        .btn-box
            position relative
            display inline-block
            float right
            top 60%
            margin 0 20px
            z-index 10
            @media screen and (max-width: 1200px) {
                position relative
                width 100%
                top 35%
                float none
                margin 0
                text-align center
            }
    .my-info
        margin 50px
        @media screen and (max-width: 1200px) {
            position relative
            top 20px
            margin 50px 10px
        }
        .info-list
            .info-list-item
                margin 10px 0
                font-size 12px 
                font-weight bold
                .info-title
                    margin 0 5px
                    color black
                    font-size 16px
                    .iconfont
                        margin  10px
        .my-data
            text-align center
            .my-data-item
                width 33%
                float left
                .my-data-title
                    color black
        .my-follow
            .my-follow-header
                border-bottom 1px solid #409EFF
                vertical-align middle
                >h4
                    color black
                    display inline-block
                    margin-block-end 10px
                >span
                    position relative
                    height 70px
                    line-height 70px
                    float right
                    font-size 14px
            .people-list
                margin 0 auto
                left 0
                right 0
                max-height 120px
                overflow hidden
                .people-header-img
                    margin 5px 5px
        .my-info-change
            background-color white
            padding 20px 30px
            @media screen and (max-width: 1200px) {
                position relative
                top 20px
            }
            >h3
                color #000
                padding 15px 0
                border-bottom 1px solid rgba(178,186,194,0.5)
            .info-list-item
                padding 20px 10px
                border-bottom 1px solid rgba(178,186,194,0.5)
                .list-title
                    display inline-block
                    width 20%
                    @media screen and (max-width: 1200px) {
                        width 100%
                    }
                .my-Info-input
                    width 70%
                    display inline-block
                    @media screen and (max-width: 1200px) {
                        width 100%
                        margin-top 10px
                    }
            .saveBtn
                margin 10px 0
</style>