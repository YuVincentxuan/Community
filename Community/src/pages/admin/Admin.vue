<template>
    <div class="content">
        <div class="container">
            <el-container style="min-height:600px; border: 1px solid #eee; margin-bottom:20px">
                <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                    <el-menu
                    :default-active="activeIndex"
                    @select="handleSelect"
                    background-color="rgb(238, 240, 243)"
                    text-color="#5eadc7"
                    active-text-color="rgb(90, 87, 87)">
                    <el-row class="manager">
                        <el-col :span="4">
                            <img alt="">
                        </el-col>
                        <el-col class="username" :span="16" :offset="3">
                        </el-col>
                    </el-row>
                    <el-menu-item index="1">
                        <i class="el-icon-s-data"></i>
                        <span slot="title">概况</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-message-solid"></i>
                        <span slot="title">消息列表</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-s-tools"></i>
                        <span slot="title">设置</span>
                    </el-menu-item>
                </el-menu>
                </el-aside>
                <el-container>
                    <el-header style="text-align: right; font-size: 12px">
                    <el-dropdown>
                        <i class="el-icon-setting" style="margin-right: 15px"></i>
                        <el-dropdown-menu  slot="dropdown">
                        <el-dropdown-item>
                        </el-dropdown-item>
                        <el-dropdown-item>新增</el-dropdown-item>
                        <el-dropdown-item>删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span>王小虎</span>
                    </el-header>
                    <el-main class="mainBox">                      
                        <admin-top v-if="activeIndex==='1'">
                        </admin-top>    
                        <message-list v-if="activeIndex==='2'" style="color:#000">
                        
                        </message-list>
                        <admin-setting v-if="activeIndex==='3'">
                        </admin-setting>
                    </el-main>
                </el-container>
            </el-container>
        </div>
    </div>    
</template>
<script>
import axios from 'axios'
import AdminTop from './component/Top'
import AdminSetting from './component/Setting'
import MessageList from './component/messageList'
export default {
    name:'Admin',
    data() {
        
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item),
         activeIndex:'1',
            haveNotRead:false,
            searchDialogVisible:false,
            searchCont:'',
            searchResult:[{
                name:'抹茶大会'
            },{
                name:'互联网大赛'
            }]
      }
    },
    components:{
        AdminTop,
        AdminSetting,
        MessageList
    },
    methods: {
        handleSelect(key,keyPath){
            this.activeIndex = key;
        },
    },
}
</script>
<style lang="stylus" scoped>
.content
    background-color #f4f5f5
    position relative
    top 80px
    @media screen and (max-width: 1200px) {
        top 60px
    }
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
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}
.mainBox{
    background-color: #fcf6f6 !important;
}
.is-active{
    background-color: #fcf6f6 !important;
}
.el-menu{
    border-right: none;
}
.manager{
    height 60px
    background-color rgb(94, 173, 199)
}
</style>