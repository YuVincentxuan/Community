<template>
    <footer>
        <div class="container">
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                <div class="logo">
               <router-link to="/">
                    <img class="logo-img" src="https://pic.downk.cc/item/5e19b7767f9a96fec18c233c.png" alt="logo">
               </router-link>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                <dl class="footer-nav">
                    <dt class="nav-title">Wingling翼灵</dt>
                    <dd class="nav-item"><a href="/">首页</a></dd>
                    <dd class="nav-item"><a href="http://www.swpuiot.com/">官网</a></dd>
                </dl>
            </el-col>       
            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                <dl class="footer-nav">
                    <dt class="nav-title">联系方式</dt>
                    <dd class="nav-item"><a href="#">电话:17721860879</a></dd>
                    <dd class="nav-item">地址:成都市新都区新都大道8号</dd>
              </dl>
            </el-col>   
            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                <dl class="footer-nav">
                    <dt class="nav-title">赞助我们</dt>
                    <dd class="nav-item "><img src="" style="width: 100px;height: 100px;"></dd>
                </dl>
            </el-col> 
            <div class="row text-center">
                <div class="footer-copyright text-center col-lg-12 margin-bottom">版权所有 © 2018-2019 翼灵物联工作室 All Rights Reserved.</div>
                <div class="footer-copyright text-center col-lg-12 footer-nav"><a href="http://www.miitbeian.gov.cn">蜀ICP备18039687号-1</a></div>
            </div>   
        </el-row>
    </div>
    </footer>
</template>
<script>
export default {
    name:'myFooter'
}
</script>
<style lang="stylus" scoped>
footer 
    position relative
    width 100%
    background-color #393F42
    padding 20px 0 20px 0
    margin-top 30px
    z-index 1000
    .container
        width 80%
        margin 0 auto
        @media screen and (max-width: 1200px) {
            width: 100%;
        }
        .logo
            text-align center
            .logo-img
                height 80px
                width 100px
        .footer-nav
            margin  10px 0
            font-size 16px
            font-weight 400
            color #858484 
            text-align center
            dd 
                margin-inline-start 0
            .nav-title
                color  #fff
                padding 10px 0
            .nav-item
                padding 5px 0
                a 
                    text-decoration none
                    color #858484
        .text-center
            text-align center
            .footer-copyright
                width 100%
                font-size 14px
                color #858484
                margin 0
                a 
                    text-decoration none
                    color #858484
</style>