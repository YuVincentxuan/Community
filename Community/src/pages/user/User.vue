<template>
    <div class="content">
        <div class="container">
            <div>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="center-nav">
                        <div class="center-bg">
                            <div class="my-header-img">
                                <el-avatar class="header-img" :size="100" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                            </div>
                            <span class="my-name">臭屁辣妹儿</span>
                            <div class="btn-box">
                                <el-button :size="_size" @click="changeInfo" plain>关注</el-button>
                            </div>
                        </div>
                        <div class="user-info">
                            <span class="">1999</span>
                            <span class="user-sign">我是一个没有感情的code killer</span>
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
                                                <router-link to="/user">
                                                    <el-avatar class="header-img" :size="50" :src="item.header"></el-avatar>
                                                </router-link>
                                                <div class="author-info">
                                                <router-link to="/article">
                                                    <span class="title">{{item.title}}</span>
                                                </router-link>
                                                <span class="author-time">
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
                                                </span>
                                                </div>
                                            </div>
                                            <div class="card-text">
                                                <span class="sm-tag">阅读 {{item.read}}</span>
                                                <span class="sm-tag">评论 {{item.comment}}</span>
                                                <span class="sm-tag">喜欢 {{item.like}}</span>
                                                <span class="sm-tag">{{item.time}}</span>
                                            </div>
                                        </li>
                                    </ul>
                                    <el-pagination
                                        background
                                        layout="prev, pager, next"
                                        :total="100">
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
                            </el-tab-pane>
                        </el-tabs>                    
                    </el-col>
                </el-row>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    name:'User',
    data(){
        return{
            activeName:'first',
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
        }
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
                float 
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
</style>