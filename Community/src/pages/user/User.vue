<template>
    <div class="content">
        <div class="container">
            <div>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="center-nav">
                        <div class="center-bg" :style="styles">
                            <div class="my-header-img">
                                <el-avatar class="header-img" :size="100" :src="this.headimg"></el-avatar>
                            </div>
                            <span class="my-name">{{userName}}</span>
                            <div class="btn-box">
                                <el-button :size="_size" v-if="this.flag == 0" @click="followBtn" plain>+关注</el-button>
                                 <el-button :size="_size" v-else @click="followBtn" plain>取消关注</el-button>
                            </div>
                        </div>
                        <div class="user-info">
                            <span class="">{{information}}</span>
                            <span class="user-sign">{{sign}}</span>
                        </div>
                    </el-col>
                </el-row>
        </div>
            <div class="user-tab">
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="center-nav">
                        <el-tabs  v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane class="tab-item" label="文章" name="first">
                                <div class="">
                                        <ul class="article">
                                            <li 
                                                class="article-item"
                                                v-for="item in articles"
                                                :key="item.title"
                                            >
                                                <div>
                                                    <!-- <router-link to="/user">
                                                        <el-avatar class="header-img" :size="50" :src="item.header"></el-avatar>
                                                    </router-link> -->
                                                    <div class="author-info">
                                                    <span @click="goToArticle(item.articleId)" class="title">{{item.title}}</span>
                                                    <div class="author-time">
                                                        <el-tag 
                                                            v-for="tag in item.tags"
                                                            :key="tag.tag"
                                                            class="article-tag"
                                                        
                                                            type="danger"
                                                            effect="dark">
                                                            {{ tag }}
                                                        </el-tag>
                                                    <div class="card-text">
                                                        <span class="sm-tag">阅读 {{item.read}}</span> ·
                                                        <span class="sm-tag">评论 {{item.comment}}</span> ·
                                                        <span class="sm-tag">喜欢 {{item.like}}</span> ·
                                                        <span class="sm-tag">{{dateStr(item.time)}}</span>
                                                    </div>
                                                    </div>
                                                    </div>
                                                </div>
                                               
                                            </li>
                                        </ul>
                                    <el-pagination
                                        background
                                        @current-change="handleCurrentChange"
                                        @prev-click="handlePrevClick"
                                        @next-click="handleNextClick"
                                        layout="prev, pager, next"
                                        page-size='6'
                                        :total="this.totalSize">
                                    </el-pagination>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane class="tab-item" label="问答" name="second">该功能暂未开放</el-tab-pane>
                            <el-tab-pane class="tab-item" label="社交圈" name="third">
                                <div class="people-follow">
                                    <el-row :gutter="50">
                                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                            <div class="my-follow">
                                                <div class="my-follow-header">
                                                    <h4>他的关注</h4>
                                                    <span>{{followingNumber}}</span>
                                                </div>
                                                <ul class="people-list">
                                                    <li v-for="(item,index) in follower" :key="index" class="people-list-item">
                                                        <el-avatar class="people-header-img" :size="50" :src="item.noticerImageUrl"></el-avatar>
                                                    </li>
                                                </ul>
                                            </div>
                                        </el-col>
                                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                            <div class="my-follow">
                                                <div class="my-follow-header">
                                                    <h4>他的粉丝</h4>
                                                    <span>{{followedNumber}}</span>
                                                </div>
                                                <ul class="people-list">
                                                    <li v-for="(item,index) in fans" :key="index" class="people-list-item">
                                                        <el-avatar class="people-header-img" :size="50" :src="item.followerImageUrl"></el-avatar>
                                                    </li>
                                                </ul>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-tab-pane>
                        </el-tabs>                    
                    </el-col>
                </el-row>
            </div>

        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'User',
    data(){
        return{
            totalSize:'',
            currentPage:1,
            totalPage:'',
            activeName:'first',
            answerNumber:'',
            articleNumber:'',
            author:'',
            headimg:'',
            information:'',
            userName:'',
            questionNumber:'',
            styles:{
                backgroundImage:''
            },
            articles:[],
            followedNumber:'',
            followingNumber:'',
            fans:[],
            follower:[],
            flag:0,
        }
    },
    methods:{
        dateStr(date){
            //获取js 时间戳
            var time=new Date().getTime();
            //去掉 js 时间戳后三位，与php 时间戳保持一致
            time=parseInt((time-date)/1000);
            //存储转换值 
            var s;
            if(time<60*10){//十分钟内
                return '刚刚';
            }else if((time<60*60)&&(time>=60*10)){
                //超过十分钟少于1小时
                s = Math.floor(time/60);
                return  s+"分钟前";
            }else if((time<60*60*24)&&(time>=60*60)){ 
                //超过1小时少于24小时
                s = Math.floor(time/60/60);
                return  s+"小时前";
            }else if((time<60*60*24*30)&&(time>=60*60*24)){ 
                //超过1天少于30天内
                s = Math.floor(time/60/60/24);
                return s+"天前";
            }else{ 
                //超过30天ddd
                var date= new Date(parseInt(date));
                return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
            }
        },
        getInformation(){
            axios.get('http://blog.swpuiot.com/common/user/informations?commonUserId='+this.$route.params.id)
            .then(this.getInformationSucc)
        },
        getInformationSucc(res){
            res = res.data
                if(res.code == 200){
                    this.author = res.author
                    this.answerNumber = res.answerNumber
                    this.articleNumber = res.articleNumber
                    this.information = res.information
                    this.headimg = res.headimg
                    this.questionNumber = res.questionNumber
                    this.userName = res.userName
                    this.styles.backgroundImage = 'url('+res.headimg+')'
                    this.flag = res.flag
                }
            }
        ,
        getArticle(){
            axios.get('http://blog.swpuiot.com/common/user/articles?pageNum='+this.currentPage+'&rows=6'+'&commonUserId='+this.$route.params.id)
            .then(res => {
                res = res.data
                if(res.code == 200){
                    this.articles = res.data
                    this.totalSize = res.totalSize
                    this.totalPage = res.totalPage
                }  
            })
        },
        getFans(){
            axios.get('http://blog.swpuiot.com/common/user/fan?rows=6&pageNum=1&commonUserId='+this.$route.params.id)
            .then(res => {
                res = res.data
                if(res.code == 200){
                    this.followedNumber = res.FollowedNumber
                    this.fans = res.data
                }
            })
        },
        getFollower(){
            axios.get('http://blog.swpuiot.com/common/user/follow?rows=6&pageNum=1&commonUserId='+this.$route.params.id)
            .then(res => {
                res = res.data
                if(res.code == 200){
                    this.follower = res.data
                    this.followingNumber = res.FollowingNumber
                }
            })
        },
        followBtn(){
            axios.get('http://blog.swpuiot.com/attention?noticerId='+this.author+'')
            .then(res => {
                res = res.data
                if(res.code == 200){
                    this.flag = res.flag
                }
            })
            // this.flag = this.flag == 0 ? 1 : 0
        },
        goToArticle(id){
            this.$router.push('/article/'+id)
        },
        handlePrevClick(){
            if(this.currentPage >0 && this.currentPage<this.totalPage){
                this.currentPage -=1
                this.getArticle()
            }
        },
        handleNextClick(){
            if(this.currentPage >0 && this.currentPage<this.totalPage){
                this.currentPage +=1
                this.getArticle()
            }
        },
        handleCurrentChange(val){
            this.currentPage = val
            this.getArticle()
        }
    },
    mounted(){
        this.getInformation()
        this.getArticle()
        this.getFans()
        this.getFollower()
    },
    activated() {
        this.getInformation()
        this.getArticle()
        this.getFans()
        this.getFollower()
    }
}   
</script>
<style lang="stylus" scoped>
.content
    background-color #f4f5f5
    position relative
    top 80px
    .container
        width 60%
        margin 0 auto
        @media screen and (max-width: 1200px) {
            width: 100%;
        }
        .bg-center
            width 100%
            height 100px
            background-color #0106ff
@media screen and (max-width: 1200px) {
    .content{
        top 60px
    }
    .center-nav {
        padding-left 0 !important
        padding-right 0 !important
    }
}
    .center-bg
        position relative
        height 150px
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
            position absolute
            display inline-block
            width 100px
            height 100px
            margin 0 auto
            top 50%
            left 0
            bottom 0
            right 0
            text-align center
            z-index 10
        .my-name
            position relative
            width 100%
            font-size 16px
            color #000
            font-weight bold
            top 80%
            margin 0 20px
            z-index 10
        .btn-box
            position relative
            display inline-block
            float right
            top 65%
            margin 0 20px
            z-index 10
            @media screen and (max-width: 1200px) {
                position relative
                text-align center
            }
    .user-info
        position relative
        top 25px
        margin 0 auto
        min-width 200px
        font-size 14px
        text-align center
        >span 
            display block
        .user-sign
            font-size 15px
            font-weight bold
            color #000
.user-tab
    position relative
    top 25px
 .article
        width 100%
        margin 10px 0
        background-color rgb(240, 240, 240)
        .article-item
            margin 0 auto
            padding 10px 20px
            background-color white
            border-bottom: 1px solid rgba(178,186,194,.15);
            .header-img
            .title
                display inline-block
                vertical-align top
                color black
                font-size 20px
                cursor pointer
                @media screen and (max-width: 1200px) {
                    font-size 16px
                }
            .card-text
                display inline-block
                @media screen and (max-width: 1200px) {
                    display block
                }
                margin-top 5px 
                .sm-tag
                    font-size 14px
        .author-info
            display inline-block
            margin-left 5px
            width 60%
            min-height 50px
            line-height 25px
            @media screen and (max-width: 1200px) {
                width 100%
            }
            .author-name
                color #000
                font-size 18px
                font-weight bold
            .author-time
                font-size 14px
                display block
                cursor pointer
                overflow hidden
                white-space nowrap
                text-overflow ellipsis
            .article-tag
                height 20px
                line-height 20px
                margin 0 10px 0 0 
    .el-pagination
        margin 10px 0 
        text-align center
    .people-follow
        padding 0 10px
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
@media screen and (max-width: 1200px) {
    .content >>> .el-pager li{
        margin 0 !important
    }
}
</style>