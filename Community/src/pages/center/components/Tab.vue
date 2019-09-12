<template>
    <div>
        <div class="center-bg">
            <div class="my-header-img">
                <el-avatar class="header-img" :size="100" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                <span class="my-name">我的名字</span>
            </div>
            <div class="btn-box">
                <el-button plain>编辑资料</el-button>
                <el-button plain>上传头像</el-button>
            </div>
        </div>
        <div class="my-info">
            <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="18">
                    <ul class="info-list">
                        <li class="info-list-item">
                            
                            <span class="info-title"><i class="el-icon-edit"></i>生日</span>12314564
                        </li>
                        <li class="info-list-item">
                            
                            <span class="info-title"><i class="el-icon-edit"></i>生日</span>12314564
                        </li>
                        <li class="info-list-item">
                           
                            <span class="info-title"> <i class="el-icon-edit"></i>生日</span>12314564
                        </li>
                    </ul>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="6"><div class="my-data">文章</div></el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    name:'CenterTab'
}
</script>
<style lang="stylus" scoped>
    .center-bg
        position relative
        height 100px
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
            position relative
            display inline-block
            top 30%
            left 5%
            z-index 10
            .header-img
                vertical-align middle
            .my-name
                position relative
                font-size 16px
                color #000
                font-weight bold
                top 10px
                margin 0 20px
        .btn-box
            position relative
            display inline-block
            float right
            top 50%
            z-index 10
    .my-info
        margin 50px
        .info-list
            .info-list-item
                margin 10px 0
                font-size 12px 
                font-weight bold
                .info-title
                    margin 0 5px
                    color black
                    font-size 16px
                    .el-icon-edit
                        margin-right 10px

</style>