<template>
    <div class="content">
        <div class="container">
          <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" class="center-nav">
                    <center-header></center-header>
                </el-col>
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <div class="certificate">
                        <div class="certificate-title">
                            <h4>我的认证</h4>
                            <span>认证特权:认证成功后，会开放写博客功能。快来认证，让更多的人看到你的博客吧！</span>
                        </div>
                        <div class="certificate-container">
                            <h5>认证状态</h5>
                            <span>未认证 已认证</span>
                            <el-button type="danger" v-show="showBtn" @click="showCetificateInput " size="mini" class="certificate-btn" plain>立即认证</el-button>
                        </div>
                        <div v-show="showInput">
                            <div style="margin: 20px;"></div>
                                <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                                <el-form-item label="名称">
                                    <el-input v-model="formLabelAlign.name"></el-input>
                                </el-form-item>
                                <el-form-item label="活动区域">
                                    <el-input v-model="formLabelAlign.region"></el-input>
                                </el-form-item>
                                <el-form-item label="活动形式">
                                    <el-input v-model="formLabelAlign.type"></el-input>
                                </el-form-item>
                                </el-form>
                            <el-button type="danger"  v-show="showInput" @click="showCetificateBtn " size="mini" class="certificate-btn" plain>立即提交</el-button>

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
    name:'Certificate',
    components:{
        CenterHeader,
        CenterTab
    },
     data() {
      return {
        labelPosition: 'left',
        showInput:false,
        showBtn :true,
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      };
    },
    methods:{
        showCetificateInput(){
            this.showInput = !this.showInput
            this.showBtn = !this.showBtn

        },
        showCetificateBtn(){
            this.showBtn = !this.showBtn
            this.showInput = !this.showInput

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
        width 80%
        margin 0 auto
        @media screen and (max-width: 1200px) {
            width: 100%;
        }
        .bg-center
            width 100%
            height 100px
            background-color #0106ff

        .certificate
            background #fff
            padding 10px
            .certificate-title
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