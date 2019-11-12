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
                            <div style="display:inline-block;margin-top:5px;" v-show="showBtn">
                                <el-tag v-if="status == 1" type="success">已认证</el-tag>
                                <el-tag v-else-if="status == 0" type="warning">认证中...</el-tag>
                                <el-tag v-else-if="status == 2" type="danger">认证失败</el-tag>
                                <el-tag v-else type="info">未认证</el-tag>
                            </div>
                            <el-button v-if="status == 3" type="danger" v-show="showBtn" @click="showCetificateInput " size="mini" class="certificate-btn" plain>立即认证</el-button>
                        </div>
                        <div class="certificateForm" v-show="showInput">
                            <div style="margin: 20px;"></div>
                                <el-form status-icon :label-position="labelPosition" ref="formLabelAlign" :rules="rules" label-width="80px" :model="formLabelAlign">
                                    <el-form-item label="姓名" prop="name">
                                        <el-input v-model="formLabelAlign.name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="学号" prop="id">
                                        <el-input v-model="formLabelAlign.id"></el-input>
                                    </el-form-item>
                                    <el-form-item label="申请理由" prop="reason">
                                        <el-input type="textarea" v-model="formLabelAlign.reason"></el-input>
                                    </el-form-item>
                                </el-form>
                            <el-button type="danger" v-show="showInput" @click="showCetificateBtn('formLabelAlign')" size="mini" class="certificate-btn" plain>立即提交</el-button>
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
        var validateName = (rule, value, callback) => {
            let testId = /^[\u4e00-\u9fa5]{2,4}$/
            if(value === ''){
                callback(new Error('请输入姓名'))
            }   
            else if(testId.test(value)){
                callback()
            }else{
                callback(new Error('请正确输入姓名'))
            }
        }
        var validateId = (rule, value, callback) => {
            let testId = /20[1-2][0-9]\d{8}/
            if(value === ''){
                callback(new Error('请输入学号'))
            }   
            else if(testId.test(value)){
                callback()
            }else{
                callback(new Error('请正确输入学号'))
            }
        }
        var validateReason = (rule, value, callback) => {
            if(value === ''){
                callback(new Error('请输入姓名哦'))
            }else{
                callback()
            }
        }
        return {
            labelPosition: 'left',
            showInput:false,
            showBtn :true,
            status:3,
            formLabelAlign: {
                name: '',
                id: '',
                reason: ''
            },
            rules:{
                name:[
                    {validator:validateName, trigger:'blur'}
                ],
                id:[
                    {validator:validateId, trigger:'blur'}
                ],
                reason:[
                    {validator:validateReason, trigger:'blur'}
                ]

            }
        };
    },
    methods:{
        showCetificateInput(){
            this.showInput = !this.showInput
            this.showBtn = !this.showBtn

        },
        showCetificateBtn(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.status = 0
                    this.showBtn = !this.showBtn
                    this.showInput = !this.showInput
                    this.$message({
                        message: '申请提交成功',
                        type: 'success'
                    });
                } else {
                    return false;
                }
            });
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
                vertical-align bottom
                >h5
                    margin-block-start 0
                    margin-block-end 0
                    color #000
                >span 
                    font-size 12px
                .certificate-btn
                    position relative
                    float right
                    top 10px
            .certificateForm
                position relative
                width 50%
                left 0
                right 0
                top 0
                bottom 0
                margin 0 auto 
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