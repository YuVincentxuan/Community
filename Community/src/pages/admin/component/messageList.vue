<template>
<div>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>认证申请列表</span>
            <div style="float: right;">
            <el-button style="padding: 3px 0" type="text"><i class="el-icon-arrow-left" @click="identify_goToPage(-1)"></i></el-button>
            <span>{{identifyPage}}</span>
            <el-button style="padding: 3px 0" type="text"><i class="el-icon-arrow-right" @click="identify_goToPage(1)"></i></el-button>
            </div>
        </div>
        <div class="text item">
            <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}">
                <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="申请理由">
                        <span>{{ props.row.reason }}</span>
                    </el-form-item>
                    </el-form>
                </template>
                </el-table-column>
                    <el-table-column
                    label="日期"
                    prop="date"
                    sortable
                    column-key="date"
                    >
                    </el-table-column>
                    <el-table-column
                    label="姓名"
                    prop="name">
                    </el-table-column>
                    <el-table-column
                    label="学号"
                    prop="idNumber">
                    </el-table-column>
                    <el-table-column
                    align="right">
                    <template slot="header" slot-scope="scope">
                        <el-input
                        v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" v-if="scope.row.statu == '已通过'">{{ scope.row.statu }}</el-button>
                        <el-button size="mini" type="danger" v-else-if="scope.row.statu == '已拒绝'">{{ scope.row.statu }}</el-button>
                        <div v-else>
                            <el-button
                                size="mini"
                                @click="handleConfirm(scope.$index, scope.row, 'yes')">同意</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleConfirm(scope.$index, scope.row, 'no')">拒绝</el-button>
                        </div>
                    </template>
                    </el-table-column>
            </el-table>
        </div>
    </el-card>
</div>
</template>
<script>
import axios from 'axios'
export default {
    name:'MessageList',
    data() {
      return {
        identifyPage:1,
        pageNum:1,
        tableData:[],
        // tableData: [{
        //     date: '2016-05-02',
        //     name: '王小虎',
        //     id: '1518',
        //     reason: '上海沙市普',
        //     statu:'已通过'
        // }, {
        //     date: '2016-05-04',
        //     name: '王小虎',
        //     id: '1518',
        //     statu:'',
        //     reason: '上海市普陀区金沙上海上海市普陀区金沙市普陀区金沙市普陀区金沙上海市普陀区金沙'
        // }, {
        //     date: '2016-05-01',
        //     name: '王小虎',
        //     id: '1518',
        //     statu:'',
        //     reason: '上海市普上海市普陀区金沙陀区'
        // }, {
        //     date: '2016-05-03',
        //     name: '王小虎',
        //     id: '1518',
        //     reason: '上海市普上海市普陀区金沙陀区金',
        //     statu:'已拒绝'
        // }],
        search: '',
        // tableData:[]
      }
    },
    methods: {
        getUserApply(){
            axios.get('http://blog.swpuiot.com/getUserApply?pageNum='+this.identifyPage+'&rows=5')
            .then(res => {
                res = res.data
                if(res.code == 200){
                    this.tableData = res.data
                    this.pageNum = res.totalPage
                }
            })
        },
        handleConfirm(index, row,result) {
            let id = result.ID
            axios.get('http://blog.swpuiot.com/setUserApplySuccessful?array=0&confirm='+result+'&id='+id+'')
            row.statu = result
        },
        identify_goToPage(data){
            if(data == -1 && this.identifyPage+data <= 0){
                this.$message.warning('已经是第一页了')
            }else if(data == 1 && this.identifyPage+data > this.pageNum){
                this.$message.warning('已经是最后一页了')
            }else{
                this.identifyPage = this.identifyPage+data
                // this.$axios.post('/identify_goToPage',{
                //     page:this.page
                // }).then(res => this.identify = res.data).catch(err => this.$message.error('获取失败'))
            }
        }
    },
    mounted(){
        this.getUserApply()
    }
}
</script>
<style>
.text {
    font-size: 14px;
  }
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-form--inline .el-form-item__content {
    display: block;
    vertical-align: top;
}
</style>
