<template>
    <div class="content">
        <div class="container">
            <el-row :gutter="20">
                <el-col class="lt-box" :xs="24" :sm="24" :md="16" :lg="16" :xl="18">
                    <div class="article-show" >
                        <div class="author-title">
                            <el-avatar class="header-img" :size="50" :src="this.headImg"></el-avatar>
                            <div class="author-info">
                                <span class="author-name">{{this.authorName}}</span>
                                <span class="author-time">{{this.date}} 阅读量 {{this.read}}</span>
                            </div>
                            <el-button class="follow-btn" size="mini" type="success">已关注</el-button>
                        </div>
                        <h1>{{this.title}}</h1>
                        <article class="article" v-html="content">

                        </article>
                    </div>
                    <div class="comment-list">
                        <h3>用户评论</h3>
                        <div class="comment-item">
                           <article-comment :list="comment"></article-comment>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="6">
                    <div class="rt-box hot-tag">
                        <div class="rt-box-header">
                            <h3><i class="header-icon el-icon-user-solid"></i>关于作者</h3>
                        </div>
                        <div class="rt-box-body">
                            <el-avatar class="header-img" :size="60" :src="this.headImg"></el-avatar>
                            <div class="author-info">
                                <span class="author-name">{{this.authorName}}</span>
                                <span class="author-sign" title="我是一个没有感情的code killer">我是一个没有感情的code killer</span>
                            </div>
                            <div class="author-data">
                                <span class=""><i class="data-icon el-icon-star-on"></i>点赞 15</span>
                                <span class=""><i class="data-icon el-icon-s-order"></i>文章 1</span>
                            </div>
                           
                        </div>
                    </div>
                    <div class="rt-box author-rank">
                        <div class="rt-box-header">
                            <h3><i class="header-icon el-icon-user-solid"></i>作者排行榜</h3>
                        </div>
                        <div class="rt-box-body">
                            
                        </div>
                    </div>
                </el-col>       
            </el-row>
        </div>
    </div>    
</template>
<script>
import ArticleComment from './component/Comment'


export default {
    name:'Article',
    components:{
        ArticleComment
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
            authorName,
        }
    },
    methods:{
        readPassage(){
            axios.post('/readPassage')
            .then(this.readPassageSucc)
        },
        readPassageSucc(res){
            res = res.data
            if(res.code == 200)
            {   
                this.title = res.title
                this.authorName = res.authorName
                this.headImg = res.headImg
                this.date = res.headImg
                this.read = res.read
                this.content = res.content
                this.comment = res.comment

            }
        }
    }
}
</script>
<style lang="stylus" scoped>
@import './article.styl';
.content
    background-color #f4f5f5
    position relative
    top 80px
    @media screen and (max-width: 1200px) {
        top 60px
    }
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
            .article
                padding 0 10px
        .comment-list
            padding 10px 0
            >h3
                padding 0 10px
                color #000
            .comment-item
                padding 10px
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
</style>