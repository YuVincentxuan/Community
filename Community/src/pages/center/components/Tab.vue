<template>
    <div>
        <div class="center-bg">
            <div class="my-header-img">
                <el-avatar class="header-img" :size="100" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                <span class="my-name">{{userName}}</span>
            </div>
            <div class="btn-box">
                <el-button :size="_size" @click="changeInfo" plain>编辑资料</el-button>
                <el-button :size="_size" plain>上传头像</el-button>
            </div>
        </div>
        <div class="my-info" v-show="myInfoShow">
            <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="18">
                    <ul class="info-list">
                        <li class="info-list-item">    
                            <span class="info-title"><i class="iconfont el-icon-user-solid"></i>签名</span>{{userSign}}
                        </li>
                        <li class="info-list-item">    
                            <span class="info-title"><i class="iconfont el-icon-user-solid"></i>生日</span>{{userBirth}}
                        </li>
                        <li class="info-list-item">
                            <span class="info-title"><i class="iconfont el-icon-star-on"></i>爱好</span>{{userHobby}}
                        </li>
                        <li class="info-list-item">  
                            <span class="info-title"> <i class="iconfont el-icon-s-cooperation"></i>工作</span>{{userJob}}
                        </li>
                        <li class="info-list-item">  
                            <span class="info-title"> <i class="iconfont el-icon-s-promotion"></i>邮箱</span>{{userEmail}}
                        </li>
                    </ul>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="6">
                    <ul class="my-data">
                        <li class="my-data-item">
                            <h4 class="my-data-title">文章</h4>
                            <span class="my-data-num">12</span>
                        </li>
                        <li class="my-data-item">
                            <h4 class="my-data-title">点赞</h4>
                            <span class="my-data-num">12</span>
                        </li>
                    </ul>
                </el-col>
            </el-row>
             <el-row :gutter="50">
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <div class="my-follow">
                        <div class="my-follow-header">
                            <h4>我的关注</h4>
                            <span>14</span>
                        </div>
                        <ul class="people-list">
                            <li class="people-list-item">
                                <el-avatar class="people-header-img" :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                            </li>
                        </ul>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <div class="my-follow">
                        <div class="my-follow-header">
                            <h4>我的粉丝</h4>
                            <span>14</span>
                        </div>
                        <ul class="people-list">
                            <li class="people-list-item">
                                <el-avatar class="people-header-img" :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                            </li>
                        </ul>
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
                                <span class="list-title">签名</span>
                                <el-input v-model="userSign" class="my-Info-input" placeholder="请输入内容"></el-input>
                            </li>                            
                            <li class="info-list-item">
                                <span class="list-title">生日</span>
                                    <el-date-picker
                                        v-model="userBirth"
                                        type="date"
                                        placeholder="选择日期">
                                    </el-date-picker>
                            </li>
                            <li class="info-list-item">
                                <span class="list-title">爱好</span>
                                <el-input v-model="userHobby" class="my-Info-input" placeholder="请输入内容"></el-input>
                            </li>
                            <li class="info-list-item">
                                <span class="list-title">工作</span>
                                <el-input v-model="userJob" class="my-Info-input" placeholder="请输入内容"></el-input>
                            </li>
                            <li class="info-list-item">
                                <span class="list-title">邮箱</span>
                                <el-input v-model="userEmail" class="my-Info-input" placeholder="请输入内容"></el-input>
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
export default {
    name:'CenterTab',
    data(){
        return{
            myInfoShow:'true',
            userName:'臭屁辣妹儿',
            userSign:'我是一个没有感情的code killer',
            userBirth:'1999-06-08',
            userHobby:'代码 coding',
            userJob:'前端',
            userEmail:'yuwxuan@qq.com'
        }
    },
    methods:{
        changeInfo(){
            this.myInfoShow = !this.myInfoShow;
        }
    },
    computed:{
        _size:function(){
        if(document.body.clientWidth <= 667){
            return 'mini'
          }else{
              return 'medium'
          }
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
        background-image url('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')
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
            top 50%
            margin 0 20px
            z-index 10
            @media screen and (max-width: 1200px) {
                position relative
                width 100%
                float none
                margin 0
                text-align center
            }
    .my-info
        margin 50px
        @media screen and (max-width: 1200px) {
            position relative
            top 20px
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
                width 50%
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