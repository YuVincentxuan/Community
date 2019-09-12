<template>
<div class="main">
    <div class="carousel">
        <el-row  :gutter="10">
            <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
                <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                <div class="grid-content bg-purple-light"></div>
            </el-col>
        </el-row>
    </div>
    <div class="container">
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="18">
                <div class="button-box">
                    <el-button class="button-item">全部文章</el-button>
                    <el-button class="button-item">热门文章</el-button>
                    <el-input
                        class="searchInput"
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="searchInput"
                        clearable
                    >
                    </el-input>
                </div>
                <ul class="article">
                    <li 
                        class="article-item"
                        v-for="item in articles"
                        :key="item.title"
                    >
                        <div>
                            <a href="">
                                <el-avatar class="header-img" :size="50" :src="item.header"></el-avatar>
                            </a>
                            <a href="">
                                <span class="title">{{item.title}}</span>
                            </a>
                        </div>
                        <div class="card-text">
                            <a  
                                v-for="tag in item.items"
                                :key="tag.label">
                                <el-tag
                                    class="article-tag"
                                   
                                    type="danger"
                                    effect="dark">
                                    {{ tag.label }}
                                </el-tag>
                            </a>
                   
                            <span class="sm-tag">阅读 {{item.read}}</span>
                            <span class="sm-tag">评论 {{item.comment}}</span>
                            <span class="sm-tag">喜欢 {{item.like}}</span>
                            <span class="sm-tag">{{item.time}}</span>
                        </div>
                    </li>
                </ul>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="6">
                <div class="rt-box hot-tag">
                    <div class="rt-box-header">
                        <h3><i class="header-icon el-icon-s-flag"></i>热门标签</h3>
                    </div>
                    <div class="rt-box-body">
                        <ul class="tag-list">
                            <li class="tag-list-item">
                                <a>
                                    <el-tag
                                    type="success"
                                    effect="dark">
                                    前端
                                    </el-tag>
                                </a>
                            
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="rt-box author-rank">
                    <div class="rt-box-header">
                        <h3><i class="header-icon el-icon-user-solid"></i>作者排行榜</h3>
                    </div>
                    <div class="rt-box-body">
                        <el-collapse v-model="activeName" accordion>
                            <el-collapse-item
                                class="author-list"
                                v-for="(author,index) in authorList"
                                :key="index"
                                :title="(index+1) +'.'+author.name" :name="index">
                                <a :href="author.url">
                                    <el-avatar class="header-img" :size="50" :src="author.headerImg"></el-avatar>
                                </a>
                                <div class="author-des">
                                    <span>文章：{{author.articlesNum}}</span>
                                    <span>粉丝：{{author.fansNum}}</span>
                                </div>
                                
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                
                </div>
            </el-col>       
        </el-row>
    </div>
</div>
</template>
<script>
export default {
    name:'HomeArticle',
    data(){
        return{
            searchInput:'',
            activeName:0,
            articles:[
                {
                    title:'这是我的第一篇文章',
                    header:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                    read:10,
                    comment:20,
                    like:5,
                    time:'12小时前',
                    items:[
                        {label:'前端'},
                        {label:'后端'},
                        {label:'安卓'},
                    ]
                },
                {
                    title:'这是我的第二篇文章',
                    header:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                    read:10,
                    comment:30,
                    like:5,
                    time:'12小时前',
                    items:[
                        {label:'前端'},
                        {label:'后端'},
                        {label:'安卓'},
                    ]
                },
                   {
                    title:'这是我的第三篇文章',
                    header:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                    read:10,
                    comment:30,
                    like:5,
                    time:'12小时前',
                    items:[
                        {label:'前端'},
                        {label:'后端'},
                        {label:'安卓'},
                    ]
                },
                {
                    title:'这是我的第四篇文章',
                    header:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                    read:10,
                    comment:30,
                    like:5,
                    time:'12小时前',
                    items:[
                        {label:'前端'},
                        {label:'后端'},
                        {label:'安卓'},
                    ]
                },
                {
                    title:'这是我的第五篇文章',
                    header:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                    read:10,
                    comment:30,
                    like:5,
                    time:'12小时前',
                    items:[
                        {label:'前端'},
                        {label:'后端'},
                        {label:'安卓'},
                    ]
                },
                {
                    title:'这是我的第六篇文章',
                    header:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                    read:10,
                    comment:30,
                    like:5,
                    time:'12小时前',
                    items:[
                        {label:'前端'},
                        {label:'后端'},
                        {label:'安卓'},
                    ]
                }
            ],
            authorList:[
                {
                    headerImg:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                    name:'Lana Del Rey',
                    url:'/',
                    articlesNum:10,
                    fansNum:100
                },
                {
                    headerImg:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                    name:'Taylor Swift',
                    url:'/',
                    articlesNum:10,
                    fansNum:100
                }
            ]
        }
    }
}
</script>
<style lang="stylus" scoped>
.container
    width 80%
    margin 0 auto
    @media screen and (max-width: 1200px) {
        width: 100%;
    }
    .button-box
        @media screen and (max-width: 1200px) {
            text-align center
        }
    .searchInput
        position relative
        width inherit 
        display inline-block
        float right
        @media screen and (max-width: 1200px) {
            width 40%
            float none
        }
    .button-item
        @media screen and (max-width: 1200px) {
            text-align center 
            width 25%
            margin-left 0 
            padding 10px
        }
    .article
        width 100%
        margin 10px 0
        background-color rgb(240, 240, 240)
        .article-item
            margin 0 auto
            padding 20px
            background-color white
            border-bottom: 1px solid rgba(178,186,194,.15);
            .header-img
            .title
                display inline-block
                height 50px
                line-height 50px
                vertical-align middle
                color black
                font-size 20px
                @media screen and (max-width: 1200px) {
                    font-size 16px
                }
            .card-text
                margin-top 5px 
                .article-tag
                    height 20px
                    line-height 20px
                    margin 0 5px
                .sm-tag
                    font-size 14px
    .rt-box
        margin-bottom 10px
        background-color white
        .rt-box-header
            padding 10px
            vertical-align middle
            border-bottom: 1px solid rgba(178,186,194,.15);
            .header-icon
                padding-right 10px
                color #0106ff
        .rt-box-body
            .el-collapse-item
                padding 0
                .header-img
                    vertical-align middle
                .author-des
                    display inline-block
                    height 50px
                    line-height 50px
                    font-size 13px
                    font-weight bold
                    .el-collapse-item__header
                        padding 10px  
                        .el-collapse-item__content
                            padding-bottom 0
            .tag-list
                padding 20px
                .tag-list-item
                    margin 2px 0
</style>