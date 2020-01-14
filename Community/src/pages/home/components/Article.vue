<template>
<div class="main">
    <!-- <div class="carousel">
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
    </div> -->
    <div class="container">
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="18">
                <div class="button-box">
                    <el-button class="button-item" @click="getListArticles(0)">全部文章</el-button>
                    <el-button class="button-item" @click="getPopularArticles(0)">热门文章</el-button>
                    <el-input
                        class="searchInput"
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="searchInput"
                        clearable
                        @keyup.enter.native = "searchArticles"
                    >
                    </el-input>
                </div>
                <ul class="article">
                    <article-loader v-if="isArticleLoading"></article-loader>
                    <li 
                        class="article-item"
                        v-for="item in articles"
                        :key="item.title"
                        v-else
                    >
                        <div>
                            <el-avatar @click.native="goToUser(item.authorId)" class="header-img" :size="50" :src="item.headimg"></el-avatar>
                            <div class="author-info">
                            <span @click="goToArticle(item.articleId)" class="title">{{item.title}}</span>
                            <span class="author-time">
                                    <el-tag
                                        class="article-tag"
                                        type="danger"
                                        effect="dark"
                                        @click="goToDirection(item.directionLabel)"
                                        >
                                        {{ item.directionLabel }}
                                    </el-tag>
                                    <el-tag
                                        class="article-tag"
                                        type="success"
                                        effect="dark">
                                        {{ item.type }}
                                    </el-tag>
                                    <el-tag v-for="(tag,i) in item.attributeLabel" :key="i"
                                        class="article-tag"
                                        type=""
                                        effect="dark"
                                        @click="goToLabel(tag)"
                                        >
                                        {{ tag }}
                                    </el-tag>
                            </span>
                        </div>
                        </div>
                        <div class="card-text">
                            <span class="sm-tag">阅读 {{item.read}}</span>
                            <span class="sm-tag">评论 {{item.comment}}</span>
                            <span class="sm-tag">喜欢 {{item.like}}</span>
                            <span class="sm-tag">{{dateStr(item.createTime)}}</span>
                        </div>
                    </li>
                </ul>
                <div class="more" v-if="allOrHot == 'all'">
                    <!-- <el-button type="primary" class="clickMore" v-if="allPageNum!=1" @click="all_goToPage(-1)">上一页</el-button>
                    <el-button type="primary" class="clickMore" v-if="allPageNum!= articles.pageNum" @click="all_goToPage(1)">下一页</el-button> -->
                    <el-button type="primary" class="clickMore" v-if="allPageNum!= articles.pageNum" @click="all_goToPage(1)">加载更多</el-button>
                    
                </div>
                <div class="more"  v-else-if="allOrHot == 'hot'">
                    <!-- <el-button type="primary" class="clickMore" v-if="hotPageNum!=1" @click="hot_goToPage(-1)">上一页</el-button>
                    <el-button type="primary" class="clickMore" v-if="hotPageNum!= articles.pageNum" @click="hot_goToPage(1)">下一页</el-button> -->
                    <el-button type="primary" class="clickMore" v-if="allPageNum!= articles.pageNum" @click="hot_goToPage(1)">加载更多</el-button>
                </div>
                <!-- <div class="more"  v-else>
                    <el-button type="primary" class="clickMore" v-if="hotPageNum!=1" @click="hot_goToPage(-1)">上一页</el-button>
                    <el-button type="primary" class="clickMore" v-if="hotPageNum!= articles.pageNum" @click="hot_goToPage(1)">下一页</el-button>
                    <el-button type="primary" class="clickMore" v-if="allPageNum!= articles.pageNum" @click="search_goToPage(1)">加载更多</el-button>
                </div> -->
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="6">
                <div class="rt-box hot-tag">
                    <div class="rt-box-header">
                        <h3><i class="header-icon el-icon-s-flag"></i>热门标签</h3>
                    </div>
                    <div class="rt-box-body">
                        <ul class="tag-list">
                            <li class="tag-list-item" v-for="(item, index) in directionList" :key="index">
                                <el-tag
                                @click="goToDirection('item')"
                                type="success"
                                effect="dark">
                                {{item}}
                                </el-tag>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="rt-box author-rank">
                    <div class="rt-box-header">
                        <h3><i class="header-icon el-icon-user-solid"></i>作者排行榜</h3>
                    </div>
                    <div class="rt-box-body">
                        <list-loader v-if="isListLoading"></list-loader>
                        <el-collapse v-else v-model="activeName" accordion>
                            <el-collapse-item
                                class="author-list"
                                v-for="(author,index) in authorList"
                                :key="index"
                                :title="(index+1) +'.'+author.name" :name="index">
                                <el-avatar @click.native="goToUser(item.homePageUrl)" class="header-img" :size="50" :src="author.photoUrl"></el-avatar>
                                <div class="author-des">
                                    <span>文章：{{author.articlesNum}}</span>
                                    <span>粉丝：{{author.fansNum}}</span>
                                </div>
                                
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </div>
                <div class="rt-box experience">
                    <div class="rt-box-header">
                        <h3><i class="header-icon el-icon-user-solid"></i>面经</h3>
                    </div>
                    <div class="rt-box-body">
                        <list-loader v-if="isExpLoading"></list-loader>
                        <ul v-else class="ex-list" >
                            <li v-for="(articles,index) in experienceArticles"
                            :key="index" @click="goToArticle(articles.articleId)"  :title="'作者:'+articles.author" class="ex-item">
                                {{articles.title}}
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>       
        </el-row>
    </div>
</div>
</template>
<script>
import axios from 'axios'
import ArticleLoader from '../../../pages/loader/ArticleLoader'
import ListLoader from '../../../pages/loader/ListLoader'
export default {
    name:'HomeArticle',
    components:{
        ArticleLoader,
        ListLoader
    },
    data(){
        return{
            searchInput:'',
            activeName:0,
            allPageNum:1,
            hotPageNum:1,
            searchPageNum:1,
            rows:10,
            articles:[],
            authorList:[],
            experienceArticles:[],
            allOrHot:'all',
            isArticleLoading: true,
            isListLoading:true,
            isExpLoading:true,
            directionList:['前端','后端','嵌入式','安卓']
        //     articles:[
        //         {
        //             title:'这是我的第一篇文章',
        //             header:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        //             read:10,
        //             comment:20,
        //             like:5,
        //             time:'12小时前',
        //             items:[
        //                 {label:'前端'},
        //                 {label:'后端'},
        //                 {label:'安卓'},
        //             ]
        //         },
        //         {
        //             title:'这是我的第二篇文章',
        //             header:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        //             read:10,
        //             comment:30,
        //             like:5,
        //             time:'12小时前',
        //             items:[
        //                 {label:'前端'},
        //                 {label:'后端'},
        //                 {label:'安卓'},
        //             ]
        //         },
        //            {
        //             title:'这是我的第三篇文章',
        //             header:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        //             read:10,
        //             comment:30,
        //             like:5,
        //             time:'12小时前',
        //             items:[
        //                 {label:'前端'},
        //                 {label:'后端'},
        //                 {label:'安卓'},
        //             ]
        //         },
        //         {
        //             title:'这是我的第四篇文章',
        //             header:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        //             read:10,
        //             comment:30,
        //             like:5,
        //             time:'12小时前',
        //             items:[
        //                 {label:'前端'},
        //                 {label:'后端'},
        //                 {label:'安卓'},
        //             ]
        //         },
        //         {
        //             title:'这是我的第五篇文章',
        //             header:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        //             read:10,
        //             comment:30,
        //             like:5,
        //             time:'12小时前',
        //             items:[
        //                 {label:'前端'},
        //                 {label:'后端'},
        //                 {label:'安卓'},
        //             ]
        //         },
        //         {
        //             title:'这是我的第六篇文章',
        //             header:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        //             read:10,
        //             comment:30,
        //             like:5,
        //             time:'12小时前',
        //             items:[
        //                 {label:'前端'},
        //                 {label:'后端'},
        //                 {label:'安卓'},
        //             ]
        //         }
        //     ],
        //     authorList:[
        //         {
        //             headerImg:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        //             name:'Lana Del Rey',
        //             url:'/',
        //             articlesNum:10,
        //             fansNum:100
        //         },
        //         {
        //             headerImg:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        //             name:'Taylor Swift',
        //             url:'/',
        //             articlesNum:10,
        //             fansNum:100
        //         }
        //     ]
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
        getListArticles(tag){
            if(tag == 0) 
            {
                this.articles = []
                this.isArticleLoading = true
            }
            this.allOrHot = 'all'
            let params = new URLSearchParams();
            params.append('pageNum',this.allPageNum)
            params.append('rows', this.rows)
            axios.post('http://blog.swpuiot.com/getListArticles',params)
            .then(this.getListArticlesSucc)
        },
        getListArticlesSucc(res){
            res = res.data
            if(res.code == 200){
                var _this = this
                res.data.forEach(function(item,index){
                    _this.articles.push(item)
                })
                 timer = setTimeout(() => {
                   this.isArticleLoading = false  
                },500)
                clearTimeout(timer)
            }
        },
                
        getPopularArticles(tag){
            if(tag == 0) {
                this.articles = []
                this.isArticleLoading = true
            }
            this.allOrHot = 'hot'
            let params = new URLSearchParams();
            params.append('pageNum',this.hotPageNum)
            params.append('rows', this.rows)
            axios.post('http://blog.swpuiot.com/getPopularArticles',params)
            // axios.post('/getPopularArticles')
            .then(this.getPopularArticlesSucc)
        },
        getPopularArticlesSucc(res){
            res = res.data
            if(res.code == 200){
                var _this = this
                res.data.forEach(function(item,index){
                    _this.articles.push(item)
                })
                timer = setTimeout(() => {
                   this.isArticleLoading = false  
                },500)
                clearTimeout(timer)
            }
        },
        getExperienceArticle(){
            axios.post('http://blog.swpuiot.com/getInterviewExperienceArticles')
            .then(this.getExperienceArticleSucc)
        },
        getExperienceArticleSucc(res){
            res = res.data
            if(res.code == 200){
                this.experienceArticles = res.data
                timer = setTimeout(() => {
                    this.isExpLoading = false
                },500)
                clearTimeout(timer)
            }
        },
        getAllAuthors(){
            axios.post('http://blog.swpuiot.com/getAllAuthors')
            .then(this.getAllAuthorsSucc)
        },
        getAllAuthorsSucc(res){
            res = res.data
            if(res.code == 200){
                this.authorList = res.url
                timer = setTimeout(() => {
                    this.isListLoading = false
                },500)
                clearTimeout(timer)
            }
        },
        searchArticles(){
            axios.get('http://blog.swpuiot.com/getPartArticles?value='+this.searchInput+'&pageNum='+this.searchPageNum+'&rows='+this.rows)
            .then(this.searchArticlesSucc)
        },
        searchArticlesSucc(res){
            this.allOrHot = 'search'
            res = res.data
            if(res.code == 200){
                this.articles  = res.data
                // var _this = this
                // res.data.forEach(function(item,index){
                //     _this.articles.push(item)
                // })
            }
        },
        all_goToPage(data){
            if(data == -1 && this.allPageNum+data <= 0){
                this.$message.warning('已经是第一页了')
            }else if(data == 1 && this.allPageNum+data >= this.articles.length){
                this.$message.warning('已经是最后一页了')
            }else{
                this.allPageNum = this.allPageNum+data
                this.getListArticles()
            }
        },
        hot_goToPage(data){
            if(data == -1 && this.hotPageNum+data <= 0){
                this.$message.warning('已经是第一页了')
            }else if(data == 1 && this.hotPageNum+data >= this.articles.pageNum){
                this.$message.warning('已经是最后一页了')
            }else{
                this.hotPageNum = this.hotPageNum+data
                this.getPopularArticles()
            }
        },
        search_goToPage(data){
            if(data == -1 && this.searchPageNum+data <= 0){
                this.$message.warning('已经是第一页了')
            }else if(data == 1 && this.searchPageNum+data >= this.articles.pageNum){
                this.$message.warning('已经是最后一页了')
            }else{
                this.searchPageNum = this.searchPageNum+data
                this.searchArticles()
            }
        },
        goToArticle(id){
            this.$router.push({
                name: 'Article',
                params:{
                    id : id
                }
            })
        },
        goToDirection(tags){
            let direction = '';
            switch(tags){
                case '前端':
                    direction = 'webfront'
                    break
                case '后端':
                    direction = 'webrear'
                    break;
                case '安卓':
                    direction = 'android'
                    break;
                case '嵌入式':
                    direction = 'embedded'
                    break;
                default:
                    direction = 'null'
            };
            this.$router.push({
                name: 'Direction',
                params:{
                    tags : direction
                }
            })
        },
        goToLabel(label){
            this.$router.push({
                name:'Label',
                params:{
                    label: label
                }
            })
        },
        goToUser(id){
            this.$router.push({
                name:'User',
                params:{
                    id: id
                }
            })
        },
    },
    mounted(){
        this.getListArticles()
        this.getAllAuthors()
        this.getExperienceArticle()
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
                vertical-align top
                color black
                font-size 20px
                margin 0 !important
                @media screen and (max-width: 1200px) {
                    font-size 16px
                    margin 0
                }
            .card-text
                margin-top 5px 
                .sm-tag
                    font-size 14px
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
                font-size 18px
                font-weight bold
            .author-time
                font-size 14px
            .article-tag
                height 20px
                line-height 20px
                margin 0 10px 0 0 
    .more
        margin 10px 0 
        text-align center
    .rt-box
        margin-bottom 10px
        background-color white
        .rt-box-header
            padding 10px
            vertical-align middle
            border-bottom: 1px solid rgba(178,186,194,.15);
            .header-icon
                padding-right 10px
                color #409EFF
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
                    display inline-block
                    margin 5px 10px
                    cursor pointer
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

@media screen and (max-width: 1200px) {
    .container >>> .el-pager li{
        margin 0 !important
    }
}
</style>