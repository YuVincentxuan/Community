<template>
    <div class="content">
        <div class="title-box">
            <el-input class="title-input" placeholder="请输入标题" v-model="title"></el-input>
            <el-button type="danger" size="medium"  @click="postArticle " class="title-btn" plain>发表博客</el-button>
        </div>
        <mavon-editor v-model="value" @change="change"></mavon-editor>
        <el-dialog title="发表博客" :visible.sync="dialogFormVisible">
            <el-form  :model="form" ref="form" :rules="rules">
                <el-form-item label="文章标签：" :label-width="formLabelWidth">
                    <el-tag
                        :key="tag"
                        v-for="tag in dynamicTags"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>
                    <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput" v-show="_showtagBtn">+ 添加标签</el-button>
                </el-form-item>
                <el-form-item  class="inlineInput" label="文章类型：" :label-width="formLabelWidth"  prop="type">
                    <el-select v-model="form.type" placeholder="请选择文章类型">
                        <el-option label="原创" value="原创"></el-option>
                        <el-option label="转载" value="转载"></el-option>
                        <el-option label="面经" value="面经"></el-option>                        
                    </el-select>
                </el-form-item>
                <el-form-item class="inlineInput" label="博客分类：" :label-width="formLabelWidth" prop="direction">
                    <el-select v-model="form.direction" placeholder="请选择博客分类">
                        <el-option label="前端" value="前端"></el-option>
                        <el-option label="后端" value="后端"></el-option>
                        <el-option label="安卓" value="安卓"></el-option>
                        <el-option label="嵌入式" value="嵌入式"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button @click="dialogFormVisible = false">保存为草稿</el-button>
                <el-button type="primary" @click="publishBlog('form')">确 定</el-button>
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
        html:'',
        dialogTableVisible:false,
        dialogFormVisible: false,
        form: {
          name: '',
          type: '',
          direction:'',
          delivery: false,
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        rules: {
          type: [
            { required: true, message: '请选择文章类型', trigger: 'change' }
          ],
          direction: [
            { required: true, message: '请选择博客分类', trigger: 'change' }
          ],
        }
    };
    },
    methods:{
        postArticle(){
            if(this.title == ''){
                this.$message({
                    type: 'info',
                    message: '题目不能为空'
                });     
            }else if(this.value == ''){
                this.$message({
                    type: 'info',
                    message: '内容不能为空'
                });  
            }
            else{
                this.dialogFormVisible  = true
            }
        },
        handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
        change(value, render){
            // render 为 markdown 解析后的结果
            this.html = render;
        },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      publishBlog(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false;
            let params = new URLSearchParams();
            params.append('title',this.title)
            params.append('content',this.value)
            params.append('contentHtml',this.html)
            params.append('directionLabel',this.form.direction)
            params.append('type',this.form.type)
            params.append('attribute',this.dynamicTags)
            axios.post('/publishBlog',params)
            .then(this.publishBlogSucc)
          } else {
            return false;
          }
        });
         
      },
      publishBlogSucc(res){
          res = res.data
      }
    },
    computed:{
        _showtagBtn(){
            return this.dynamicTags.length >= 3 ?  false : true 
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
        display flex
        padding 5px 0
        .title-input
            flex 1 0
            margin-right 10px
    .inlineInput
        display inline-block
        width 50%
        float left
        margin-bottom 40px
    .v-note-wrapper
        height 100%
        z-index 55
.content >>> .el-input
    /*margin-left 10px*/
</style>
<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .el-form-item__error {
    margin-left: 10px;
}
</style>
