<template>
    <div class="content">
        <div class="container">
          <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" class="center-nav">
                    <center-header></center-header>
                </el-col>
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                <div class="blog">
                    <div class="blog-title">
                        <h4>我的博客</h4>
                    </div>
                    <ul class="article">
                        <li 
                            class="article-item"
                            v-for="item in articles"
                            :key="item.title"
                        >
                            <div>
                                <!-- <el-avatar @click.native="goToUser(item.authorId)" class="header-img" :size="50" :src="item.header"></el-avatar> -->
                                <div class="author-info">
                                    <span @click="goToArticle(item.articleId)" class="title">{{item.titile}}</span>
                                    <span class="author-time">
                                            <el-tag
                                             v-for="tag in item.tags"
                                                :key="tag.label"
                                                class="article-tag"
                                            
                                                type="danger"
                                                effect="dark">
                                                {{ tag }}
                                            </el-tag>
                                    </span>
                                </div>
                            </div>
                            <div class="card-text">
                                <span class="sm-tag">阅读 {{item.read}}</span>
                                <span class="sm-tag">评论 {{item.comment}}</span>
                                <span class="sm-tag">喜欢 {{item.like}}</span>
                                <span class="sm-tag">{{dateStr(item.time)}}</span>
                            </div>
                            <div class="btn-box">
                                <el-button type="info" size="mini" @click="edit(item.articleId)" plain>编辑</el-button>
                                <el-button type="danger" size="mini" @click="deleteRow(i,item.articleId)" plain>删除</el-button>
                            </div>
                        </li>
                    </ul>
                    <el-pagination
                        background
                        @current-change="handleCurrentChange"
                        @prev-click="handlePrevClick"
                        @next-click="handleNextClick"
                        layout="prev, pager, next"
                        :total="this.totalSize">
                    </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import CenterHeader from './components/CenterHeader'
export default {
    name:'Blog',
    components:{
        CenterHeader
    },
     data(){
        return{
            rows:10,
            pageNum:1,
            totalSize:0,
            searchInput:'',
            activeName:0,
            articles:[
                // {
                //     title:'这是我的第一篇文章',
                //     header:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                //     read:10,
                //     comment:20,
                //     like:5,
                //     time:'12小时前',
                //     items:[
                //         {label:'前端'},
                //         {label:'后端'},
                //         {label:'安卓'},
                //     ]
                // },
                // {
                //     title:'这是我的第二篇文章',
                //     header:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                //     read:10,
                //     comment:30,
                //     like:5,
                //     time:'12小时前',
                //     items:[
                //         {label:'前端'},
                //         {label:'后端'},
                //         {label:'安卓'},
                //     ]
                // },
                //    {
                //     title:'这是我的第三篇文章',
                //     header:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                //     read:10,
                //     comment:30,
                //     like:5,
                //     time:'12小时前',
                //     items:[
                //         {label:'前端'},
                //         {label:'后端'},
                //         {label:'安卓'},
                //     ]
                // },
                // {
                //     title:'这是我的第四篇文章',
                //     header:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                //     read:10,
                //     comment:30,
                //     like:5,
                //     time:'12小时前',
                //     items:[
                //         {label:'前端'},
                //         {label:'后端'},
                //         {label:'安卓'},
                //     ]
                // },
                // {
                //     title:'这是我的第五篇文章',
                //     header:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                //     read:10,
                //     comment:30,
                //     like:5,
                //     time:'12小时前',
                //     items:[
                //         {label:'前端'},
                //         {label:'后端'},
                //         {label:'安卓'},
                //     ]
                // },
                // {
                //     title:'这是我的第六篇文章',
                //     header:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                //     read:10,
                //     comment:30,
                //     like:5,
                //     time:'12小时前',
                //     items:[
                //         {label:'前端'},
                //         {label:'后端'},
                //         {label:'安卓'},
                //     ]
                // }
            ],
            // authorList:[
            //     {
            //         headerImg:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            //         name:'Lana Del Rey',
            //         url:'/',
            //         articlesNum:10,
            //         fansNum:100
            //     },
            //     {
            //         headerImg:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            //         name:'Taylor Swift',
            //         url:'/',
            //         articlesNum:10,
            //         fansNum:100
            //     }
            // ]
        }
    },
    methods: {
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
        deleteRow(index,id) {
            this.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.get('http://blog.swpuiot.com/deleArticle?articleId='+id+'')
                .then(res => {
                    res = res.data
                    if(res.code == 200){
                        this.articles.splice(index, 1);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }
                })
               
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        edit(id){

        },
        getUserArticles(){
            axios.get('http://blog.swpuiot.com/user/articles?pageNum='+this.pageNum+'&rows='+this.rows)
            .then(this.getUserArticlesSucc)
        },
        getUserArticlesSucc(res){
            res = res.data
            if(res.code == 200){
                console.log(res)
                this.articles = res.data
                this.totalSize = res.totalSize
            }
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
        this.getUserArticles()
    }
}
</script>
<style lang="stylus" scoped>
.content
    background-color #f4f5f5
    position relative
    top 80px
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
    .blog
        background #fff
        padding 10px
        .blog-title
                padding-bottom 10px
                border-bottom 1px solid #409EFF
                >h4
                    display inline-block
                    margin-block-start 0
                    margin-block-end 0 
                    border-left 3px solid #7097c9
                    padding-left 5px 
                    color #000
                >span 
                    display inline-block
                    font-size 12px
                    width 60%
                    white-space nowrap
                    text-overflow ellipsis 
                    overflow hidden
                    vertical-align bottom
        .article
            width 100%
            margin 0
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
                @media screen and (max-width: 1200px) {
                    font-size 16px
                }
            .card-text
                margin-top 5px 
                .sm-tag
                    font-size 14px
            .btn-box
                position relative
                float right
                top -50px
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

    .el-pagination
        margin 10px 0 
        text-align center
@media screen and (max-width: 1200px) {
    .content{
        top 60px
    }
    .center-nav {
        padding-left 0 !important
        padding-right 0 !important
    }
    .content >>> .el-pager li{
        margin 0 !important
    }
}
</style>