<template>
    <div class="content">
        <div class="container">
          <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" class="center-nav">
                    <center-header></center-header>
                </el-col>
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <center-tab ></center-tab>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import CenterHeader from './components/CenterHeader'
import CenterTab from './components/Tab'
export default {
    name:'Center',
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
</style>