<template>
<div class="main">
    <el-carousel :interval="4000" trigger="click" type="card" :height="_height">
        <el-carousel-item v-for="(item,index) in images" :key="index">
          <div class="title">
            <div class="title-item">
              <h3 class="small">{{item.direction}}</h3>

            </div>
          </div>
          <el-image 
            class="image"
            fit="cover"
            style="width: 100%; height: 100%"
            :src="item.imageUrl"
            @click.native="goToUrl(item.articleUrl)"
          >
          </el-image>
      
        </el-carousel-item>
    </el-carousel>
    <div class="container">
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="18">
                <div class="button-box">
                    <el-button class="button-item" @click="getListArticles">全部文章</el-button>
                    <el-button class="button-item" @click="getPopularArticles">热门文章</el-button>
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
                    >
                        <div>
                            <el-avatar @click.native="goToUser(item.authorId)" class="header-img" :size="50" :src="item.headimg"></el-avatar>
                            <div class="author-info">
                            <span @click="goToArticle(item.articleId)" class="title">{{item.title}}</span>
                            <span class="author-time">
                                    <el-tag
                                        class="article-tag"
                                        type="success"
                                        effect="dark">
                                        {{ item.type }}
                                    </el-tag>
                                <a  
                                v-for="(tag,i) in item.attributeLabel"
                                :key="i">
                                    <el-tag
                                        class="article-tag"
                                        type=""
                                        effect="dark">
                                        {{ tag }}
                                    </el-tag>
                                 </a>
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
                <div class="more" v-show="allOrHot == 'all'">
                    <el-button type="primary" class="clickMore" v-if="allPageNum!=1" @click="all_goToPage(-1)">上一页</el-button>
                    <el-button type="primary" class="clickMore" v-if="allPageNum!= articles.pageNum" @click="all_goToPage(1)">下一页</el-button>
                </div>
                <div class="more"  v-show="allOrHot == 'hot'">
                    <el-button type="primary" class="clickMore" v-if="hotPageNum!=1" @click="hot_goToPage(-1)">上一页</el-button>
                    <el-button type="primary" class="clickMore" v-if="hotPageNum!= articles.pageNum" @click="hot_goToPage(1)">下一页</el-button>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="6">
                <div class="rt-box hot-tag">
                    <div class="rt-box-header">
                        <h3><i class="header-icon el-icon-s-flag"></i>所有标签</h3>
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
                        <list-loader v-if="isListLoading"></list-loader>
                            <div
                                class="header-img-box"
                                v-for="(author,index) in authorList"
                                :key="index"
                                :title="(index+1) +'.'+author.name" :name="index"
                            >
                                <router-link :to="author.homePageUrl">
                                    <el-avatar class="header-img" :size="50" :src="author.photoUrl"></el-avatar>
                                </router-link>
                            </div>
                    </div>
                </div>
                <div class="rt-box experience">
                    <div class="rt-box-header">
                        <h3><i class="header-icon el-icon-user-solid"></i>面经</h3>
                    </div>
                    <div class="rt-box-body">
                        <list-loader v-if="isExpLoading"></list-loader>
                        <ul class="ex-list" 
                            v-for="(articles,index) in experienceArticles"
                            :key="index">
                            <router-link to="/article" tag="li" :title="'作者:'+articles.authorname" class="ex-item">
                                {{articles.title}}
                            </router-link>
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
import ArticleLoader from '../../pages/loader/ArticleLoader'
import ListLoader from '../../pages/loader/ListLoader'
export default {
    name:'Direction',
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
            rows:10,
            articles:[],
            authorList:[],
            experienceArticles:[],
            allOrHot:'all',
            isArticleLoading: true,
            isListLoading:true,
            isExpLoading:true
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
        getListArticles(){
            this.allOrHot = 'all'
            let params = new URLSearchParams();
            params.append('pageNum',this.allPageNum)
            params.append('rows', this.rows)
            axios.post('http://blog.swpuiot.com/getListArticles',params)
            .then(this.getListArticlesSucc)
        },
        getListArticlesSucc(res){
            res = res.data
            this.isArticleLoading = false
            if(res.code == 200){
                this.articles = res.data
            }
        },
        getPopularArticles(){
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
                this.articles = res.data
            }
        },
        getExperienceArticle(){
            axios.post('http://blog.swpuiot.com/getInterviewExperienceArticles')
            .then(this.getExperienceArticleSucc)
        },
        getExperienceArticleSucc(res){
            res = res.data
            this.isExpLoading = false
            if(res.code == 200){
                this.experienceArticles = res.data
            }
        },
        getAllAuthors(){
            axios.post('http://blog.swpuiot.com/getAllAuthors')
            .then(this.getAllAuthorsSucc)
        },
        getAllAuthorsSucc(res){
            res = res.data
            this.isListLoading = false
            if(res.code == 200){
                this.authorList = res.url
            }
        },
        searchArticles(){
            axios.get('http://blog.swpuiot.com/getPartArticles?value='+this.searchInput+'&pageNum='+this.hotPageNum+'&rows='+this.rows)
            .then(this.searchArticlesSucc)
        },
        searchArticlesSucc(res){
            res = res.data
            if(res.code == 200){
                this.articles = res.data
            }
        },
        all_goToPage(data){
            if(data == -1 && this.allPageNum+data <= 0){
                this.$message.warning('已经是第一页了')
            }else if(data == 1 && this.allPageNum+data >= this.articles.pageNum){
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
                this.getListArticles()
            }
        },
        goToArticle(id){
            sessionStorage.setItem('id',id)
            this.$router.push({
                name: 'Article',
                params:{
                    id : id
                }
            })
        },
        goToUser(id){
            this.$router.push('/user/'+id)
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
            .header-img-box
                display inline-block
                padding 10px
                .header-img
                    vertical-align middle
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

@media screen and (max-width: 1200px) {
    .container >>> .el-pager li{
        margin 0 !important
    }
}
</style>