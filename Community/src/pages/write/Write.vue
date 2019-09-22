<template>
    <div class="content">
        <div class="title-box">
            <el-input class="title-input" placeholder="请输入标题" v-model="title"></el-input>
            <el-button type="danger" size="medium" @click="postArticle " class="title-btn" plain>发表博客</el-button>
        </div>
        <mavon-editor v-model="value" ></mavon-editor>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
   
    </div>

</template>

<script>
 
export default {
    name:'Write',
    data() {
    return {
        value: '',
        defaultData: "preview",
        title:'',
        dialogTableVisible:false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
    };
    },
    methods:{
        postArticle(){
            if(this.title == ''){
                  this.$message({
                    type: 'info',
                    message: '题目不能为空'
                });     
            }else{
                this.dialogFormVisible  = true
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.content
    top 70px
    position relative
    height  80vh
    padding 0 10px
    .title-box
        padding 5px 0
        .title-input
            width 90%
    .v-note-wrapper
        height 100%
        z-index 55
</style>