<template>
    <header class="header-nav">
        <el-row>
            <el-col :xs="10" :sm="3" :md="3" :lg="3" :offset="1">
                <div class="header">
                    <img src="../assets/wingling.png" alt="">
                    <h1>翼灵社区</h1>
                </div>
            </el-col>
            <el-col :xs="13" :sm="20" :md="20" :lg="20" class="offcanvas-collapse">
                <el-col :xs="18" :sm="18" :md="15" :lg="18">
                 <el-menu :default-active="activeIndex" class="el-menu-demo" router mode="horizontal">
                    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
                        {{item.navItem}}
                    </el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :xs="6" :sm="6" :md="8" :lg="7" class="rightNav">
                   
                </el-col>
            </el-col>
                      
        </el-row>
        
    </header>
</template>
<script>
export default {
    name:'Header',
    data() {
      return {
        activeIndex: '1',
        navActive:false,
        searchCont:'',
        navList:[
            {name:'/',navItem:'首页'},
            {name:'/center',navItem:'个人中心'},
        ]
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
<style lang="stylus" scoped>
header{
    border-bottom: 1px solid #ccc;
    background: white;
    width: 100%;
    position: fixed;
    z-index:10002;
}
.header,.lo-re-box,.rightNav{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.header img{
    width:40px;
    vertical-align middle;
}
header h1{
    font-size: 22px;
    color: rgb(119, 111, 111);
}
@media screen and (max-width: 768px) {
    .offcanvas-collapse{
        display: none;
    }
    .navActive{
        display: block;
    }
    span.nav-on{
        display: block;
    }
    .header h1{
        width:150px;
    }
}
</style>