<template>
    <div class="content">
        <div class="container">
          <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" class="center-nav">
                    <center-header></center-header>
                </el-col>
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <div class="message">
                        <div class="message-title">
                            <h4>我的消息</h4>
                            <span></span>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import CenterHeader from './components/CenterHeader'
import CenterTab from './components/Tab'
export default {
    name:'Message',
    components:{
        CenterHeader,
        CenterTab
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
        .message
            background #fff
            padding 10px
            .message-title
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
            .certificate-container
                padding 10px
                >h5
                    margin-block-start 0
                    margin-block-end 0
                    color #000
                >span 
                    font-size 12px
                .certificate-btn
                    position relative
                    float right
                    top -5px
@media screen and (max-width: 1200px) {
    .content{
        top 60px
    }
    .center-nav {
        padding-left 0 !important
        padding-right 0 !important
    }
}
</style>