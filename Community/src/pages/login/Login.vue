<template>
     <div class="content">
      <div class="container">
        <div>
          <h2> 授权登录 </h2>
          <div class="horizental" style="font-size:14px;color:#7d7d7d"> 一步之遥，成为社区里的你 </div>
          <div>
              <a href="https://graph.qq.com/oauth/show?which=Login&amp;display=pc&amp;response_type=code&amp;client_id=101536277&amp;redirect_uri=http://blog.swpuiot.com/login/qq" style="text-decoration-line: none">
                  <img alt="" src="http://springforall.ufile.ucloud.com.cn/images/icon/qq.svg" style="max-width: 64px; max-height: 64px">
              </a>
          </div>
          <h4  style="font-size:16px;color:#7d7d7d"> 赞助我们 </h4>
          <div  style="text-align:center">
            <a href="#" style="text-decoration-line: none">
              <img alt="" src="http://blog.swpuiot.com/img/pay.jpg" style="max-width: 200px; max-height: 200px">
            </a>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    name:'Login'
}
</script>
<style lang="stylus" scoped>
.content
    background-color #f4f5f5
    position relative
    top 80px
    .container
        text-align center
        width 80%
        margin 0 auto
        color #000
        @media screen and (max-width: 1200px) {
            width: 100%;
        }
        h2
          display block
          font-size 2em
          margin-block-start 0
          margin-block-end 0
        .horizental
          padding 20px 0
          margin 10px 0
          border-bottom 1px solid #000
</style>