<template>
    <div class="survey">
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <h2 class="dataTitle">用户数据</h2>
                <el-card class=" dataProgress" >
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" >
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" >
                        <div class="circleProgress">
                            <el-progress :show-text="false" :width="180" :stroke-width="15" type="circle" :percentage="percentage1"></el-progress>
                            <div class="increaseMsg">
                                <span>注册人数</span>
                                <p>100</p>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" >
                        <div class="circleProgress">
                            <el-progress :show-text="false" :width="180" :stroke-width="15" type="circle" :percentage="percentage2" color="#7A17EA"></el-progress>
                            <div class="increaseMsg">
                                <span>认证人数</span>
                                <p>70</p>
                            </div>
                        </div>
                    </el-col>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" >
                        <div >
                            <div id="myChart2" :style="{width: '100%', height:'200px'}"></div>
                        </div>
                    </el-col>
                </el-card >
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <h2 class="dataTitle">每周博客量统计</h2>
                <div style="margin-top: 20px">
                <el-col v-for="(item,index) in data" :key="index" :xs="24" :sm="24" :md="6" :lg="6" :xl="6" >
                    <div  @click="showData(index)">
                        <el-card class="dataBox" >
                            <div class="icon iconColor">
                                <i class="el-icon-s-opportunity"></i>
                            </div>
                            <div class="number">
                                <h5 class="showNumberTitle ">{{item.item}}</h5>
                            <NumberGrow class="showNumber" :value="item.num"></NumberGrow>
                            </div>
                        </el-card>  
                    </div>
                </el-col>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="dataChart">
                    <div id="myChart" :style="{width: '100%', height:'400px'}"></div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
var hoursList = []
import NumberGrow from '../component/NumberGrow'
export default {
    name:'AdminTop',
    components:{
        NumberGrow
    },
    data(){
        return{
           hoverIndex:-1,
           percentage1:0,
           aimGoal1:100,
            percentage2:0,
           aimGoal2:70,
           data:[
               {num:200,item:'前端博客数',data: [820, 932, 901, 934, 1290, 1330, 1320]},
               {num:300,item:'后端博客数',data: [120, 962, 901, 964, 190, 130, 1360]},
               {num:200,item:'安卓博客数',data: [820, 932, 191, 924, 1390, 1630, 120]},
               {num:500,item:'嵌入式博客数',data: [820, 932, 911, 934, 1290, 1330, 1320]},

           ],
        
        }
    },
    props: {
        time: {
            type: Number,
            default: 2
        },
        value: {
            type: Number,
            default: 600
        }
    },
    methods: {
        creatE: function(){
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
                xAxis: {
                        type: 'category',
                        data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line'
                    }],
                    tooltip: {
                        position: 'top',
                        formatter: function (params) {
                            return params.value+'篇 ';
                        }
                }
            });  
                    
        },
        creatE2: function(){
            let myChart = this.$echarts.init(document.getElementById('myChart2'))
            // 绘制图表
            myChart.setOption({
                title : {
                    text: '用户认证年级',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['2014级','2015级','2016级','2017级','2018级','2019级']
                },
                series : [
                    {
                        name: '用户来源',
                        type: 'pie',
                        radius : '75%',
                        center: ['55%', '55%'],
                        data:[
                            {value:15, name:'2014级'},
                            {value:10, name:'2015级'},
                            {value:24, name:'2016级'},
                            {value:13, name:'2017级'},
                            {value:18, name:'2018级'},
                            {value:14, name:'2019级'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });  
                    
        },
        showData(i){
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            console.log(this.data[i].data)
            myChart.setOption({
                series: [{
                    // 根据名字对应到相应的系列
                    type: 'line',
                    data: this.data[i].data
                }],
                tooltip: {
                    position: 'top',
                    formatter: function (params) {
                        return params.value+'篇 ';
                    }
                }
            });
        },
        increase(){
                console.log(this.percentage)
                this.percentage1 == this.aimGoal1 ? null : this.percentage1 += this.aimGoal1
                this.percentage2 == this.aimGoal2 ? null : this.percentage2 += this.aimGoal2
        }
    },
    mounted () {
        this.creatE();
        this.creatE2();
        this.increase();
    }
}
</script>
<style scoped>
.survey{
    padding: 10px;
}
.el-button-group{
    margin-right: 20px;
}
.el-button-group i{
    cursor: pointer;
}
.el-button-group i:hover{
    color: rgb(139, 187, 231);
}
.el-card__body {
    padding: 0 !important;
}
.col-data{
    margin: 0 10px;
}
.dataBox{
    height: 100%;
    padding: 10px;
    /* text-align: center; */
}
.circleProgress{
    position: relative;
    text-align: center;
}
.increaseMsg{
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    font-size: 14px;
    z-index:100
}
.increaseMsg p{
    font-weight: 600;
    margin:5px 0;
}
.icon{
    display: inline-block;
    height: 50px;
    width:50px;
    padding: 10px;
    cursor: pointer !important;
    border-radius: 10px;
    transition:background-color .5s,color .5s;
}
.iconColor{
    background-color: #fff;
    color:#409eff
}
.dataBox:hover .icon{
    background-color: #409eff;
    color: #fff
}
.icon i{
    font-size: 50px;
    line-height: 50px;
}
.number{
    display: inline-block;
    height: 50px;
    width: 90px;
    text-align: center;
    padding: 10px;
    float: right;
    cursor: pointer !important;
}
.number .showNumber{
    font-size: 25px;
    line-height: 25px;
    color: #000
}
h2,h5{
    margin-block-end: 0;
    margin-block-start: 0;
}
.dataTitle{
    margin: 0 10px;
    border-left: 10px solid rgb(94, 173, 199);
    padding-left:10px;
    color: #000;
}
.showNumberTitle{
    font-size: 15px;
    line-height: 25px;
    color: #000
}
.dataChart{
    background-color: #fff;
    margin: 20px 10px;
    text-align: center;
}
.dataProgress{
    padding: 30px 20px ;
    margin: 20px 10px;
}
</style>