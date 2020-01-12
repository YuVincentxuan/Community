<template>
<div>
    <div class="content">
        <div class="left-nav">
            <ul class="nav-list">
                <li class="nav-item" @click="addLike">
                    <el-badge :value="'99+'" class="item" type="primary" >
                        <i v-if="isNotLiked" class="el-icon-star-off"></i><i v-else class="el-icon-star-on like-actived"></i>
                    </el-badge>
                </li>
                <li class="nav-item">
                    <el-badge :value="9" class="item" type="primary">
                        <a href="#comments"><i class="el-icon-chat-dot-round"></i></a>
                    </el-badge>
                </li>
                <li class="nav-item disabled">
                    <el-badge value="" class="item" type="primary">
                        <i class="el-icon-collection-tag"></i>
                    </el-badge>
                </li>
            </ul>
        </div>
        <div class="container">
            <el-row :gutter="20">
                <el-col class="lt-box" :xs="24" :sm="24" :md="16" :lg="16" :xl="18">
                    <article-loader v-if="isArticleLoading"></article-loader>
                    <div v-else class="article-show" >
                        <div class="author-title">
                            <el-avatar class="header-img" :size="50" :src="headImg"></el-avatar>
                            <div class="author-info">
                                <span class="author-name">{{this.authorName}}</span>
                                <span class="author-time">{{this.date}} 阅读量 {{this.read}}</span>
                            </div>
                            <el-button class="follow-btn" v-if="this.flag==0" @click="followBtn" size="mini" type="success">+ 关注</el-button>
                            <el-button class="follow-btn" v-else @click="followBtn" size="mini" type="success">取消关注</el-button>
                        </div>
                        <h1>{{this.title}}</h1>
                        <mavon-editor
                            class="md"
                            :value="content"
                            :subfield="false"
                            :defaultOpen="'preview'"
                            :toolbarsFlag="false"
                            :editable="false"
                            :scrollStyle="true"
                            :ishljs="true"
                        ></mavon-editor>
                    </div>
                    <div class="comment-list">
                        <h3 id="comments">用户评论</h3>
                        <div class="comment-item">
                           <article-comment :comments="comment"></article-comment>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="6" >
                    <div class="rt">
                        <div class="rt-box hot-tag">
                            <div class="rt-box-header">
                                <h3><i class="header-icon el-icon-user-solid"></i>关于作者</h3>
                            </div>
                            <infor-loader v-if="isInforLoading"></infor-loader>
                            <div v-else class="rt-box-body">
                                <el-avatar class="header-img" :size="60" :src="headImg"></el-avatar>
                                <div class="author-info">
                                    <span class="author-name">{{this.authorName}}</span>
                                    <span class="author-sign" title="我是一个没有感情的code killer">我是一个没有感情的code killer</span>
                                </div>
                                <div class="author-data">
                                    <span class=""><i class="data-icon el-icon-star-on"></i>关注 {{attention}}</span>
                                    <span class=""><i class="data-icon el-icon-star-on"></i>粉丝 {{fans}}</span>
                                    <span class=""><i class="data-icon el-icon-s-order"></i>文章 {{articleNum}}</span>
                                </div>
                            
                            </div>
                        </div>
                        <div class="rt-box experience">
                            <div class="rt-box-header">
                                <h3><i class="header-icon el-icon-user-solid"></i>推荐文章</h3>
                            </div>
                            <list-loader v-if="isListLoading"></list-loader>
                            <div v-else class="rt-box-body">
                                <ul class="ex-list" 
                                    v-for="(articles,index) in articleList"
                                    :key="index">
                                    <router-link to="/article" tag="li" :title="'题目:'+articles.title" class="ex-item">
                                        {{articles.title}}
                                    </router-link>
                                </ul>
                            </div>
                        </div>
                    </div>
                </el-col>    

            </el-row>
        </div>
    </div>
    <my-footer></my-footer> 

</div>   
</template>
<script>
import axios from 'axios'
import ArticleComment from './component/Comment'
import ArticleLoader from '../../pages/loader/ArticleLoader'
import InforLoader from '../../pages/loader/InforLoader'
import ListLoader from '../../pages/loader/ListLoader'
import myFooter from '../myFooter'
export default {
    name:'Article',
    components:{
        ArticleComment,
        ArticleLoader,
        InforLoader,
        ListLoader,
        myFooter
    },
    data(){
        return{
           content:`
               `,
            comment:[],
            title:'',
            read:'',
            date:'',
            headImg:'',
            authorName:'',
            author:'',
            articleList:[],
            flag: 0,
            articleNum:0, 
            attention :0,
            fans:0,
            isArticleLoading: true,
            isInforLoading: true,
            isListLoading: true,
            isNotLiked: true
        }
    },
    methods:{
        readPassage(){
            let params = new URLSearchParams();
            params.append('num', this.$route.params.id)
            axios.post('http://blog.swpuiot.com/readPassage',params)
            .then(this.readPassageSucc)
        },
        readPassageSucc(res){
            res = res.data
            if(res)
            {   
                this.title = res.title
                this.authorName = res.authorName
                this.author = res.author
                this.headImg = res.headimg
                this.date = res.date
                this.read = res.read
                this.content = res.content
                this.comment = res.comment
                this.articleList = res.articleList
                timer = setTimeout(() => {
                    this.isArticleLoading = false
                    this.isListLoading = false
                    this.isInforLoading = false
                },500)
                clearTimeout(timer)
            } 
        },
        getInformation(){
            axios.get('http://blog.swpuiot.com/information?rows=4&pageNum=1')
            .then(this.getInformationSucc)
        },
        getInformationSucc(res){
            res = res.data
            if(res.code == 200){
                this.flag = res.flag
                this.articleNum = res.articleNum
                this.attention = res.attention
                this.fans = res.fans
            }
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
        addLike(){
            this.isNotLiked = !this.isNotLiked
        }
    },
    mounted(){
        this.readPassage()
        this.getInformation()
    },
    activated() {
        this.isArticleLoading = true
        this.isListLoading = true
        this.isInforLoading = true
        this.readPassage()
        this.getInformation()
    }
}
</script>
<style lang="stylus" scoped>
@import './article.styl';
.content
    background-color #f4f5f5
    position relative
    top 80px
    margin-bottom 100px
    min-height 100%
    @media screen and (max-width: 1200px) {
        top 60px
        margin-bottom 60px
    }
    .left-nav
        position fixed 
        margin-left 50px
        top 250px
        .nav-list
            .disabled
                cursor not-allowed 
            .nav-item
                height 50px
                width 50px
                line-height 50px
                text-align center
                font-size 20px
                color #909399
                border-radius 50%
                background-color #fff
                margin 15px 0 
                @media screen and (max-width: 1200px) {
                    display none
                }
                a
                    color #909399
                a:link
                    color #909399
                a:active
                    color #909399
                .like-actived
                    color #F7ED46

    .container
        width 80%
        margin 0 auto
        @media screen and (max-width: 1200px) {
            width: 100%;
        }
        .bg-center
            width 100%
            height 100px
            background-color #0106ff
    .lt-box
        background-color #fff
        .article-show
            width 100%
            border-bottom 1px solid rgba(178,186,194,.15)
            .author-title
                padding 10px
                .header-img
                    display inline-block
                    vertical-align top
                .author-info
                    display inline-block
                    margin-left 5px
                    width 60%
                    height 50px
                    line-height 25px
                    >span 
                        display block
                        cursor pointer
                        overflow hidden
                        white-space nowrap
                        text-overflow ellipsis
                    .author-name
                        color #000
                        font-size 20px
                        font-weight bold
                    .author-time
                        font-size 15px
                .follow-btn
                    float right
                    @media screen and (max-width : 1200px){
                        padding 7px
                    }
            h1
                color #000
                width 100%
                padding-bottom 15px
                border-bottom 1px solid rgba(178,186,194,.15)   
                margin-block-start 0 !important
                margin-block-end 0 !important
            .v-note-wrapper
                min-height 0
                box-shadow none !important
        .comment-list
            padding 10px 0
            >h3
                padding 0 10px
                color #000
            .comment-item
                padding 10px
    .rt
        position fixed
        .rt-box
            margin-bottom 10px
            background-color white
            .rt-box-header
                padding 10px
                vertical-align middle
                border-bottom: 1px solid rgba(178,186,194,.15)
                .header-icon
                    padding-right 10px
                    color #409EFF
            .rt-box-body
                padding 10px 20px
                .header-img
                    display inline-block
                    vertical-align top
                .author-info
                    display inline-block
                    width 60%
                    height 60px
                    line-height 30px
                    >span 
                        display block
                        cursor pointer
                        overflow hidden
                        white-space nowrap
                        text-overflow ellipsis
                    .author-name
                        color #000
                        font-size 20px
                        font-weight bold
                    .author-sign
                        font-weight bold
                        font-size 14px
                .author-data
                    position relative
                    padding 0 65px
                    >span 
                        font-size 16px
                        font-weight bolder
                        margin 5px 0
                        display block
                    .data-icon
                        padding-right 10px
                        color #000
                .tag-list
                    padding 20px
                    .tag-list-item
                        margin 2px 0
                .ex-list
                    .ex-item
                        padding 10px 10px
                        border-bottom: 1px solid rgba(178,186,194,.15)
                        color #000
                        font-size 18px
                        cursor pointer
                        overflow hidden
                        white-space nowrap
                        text-overflow ellipsis
</style>