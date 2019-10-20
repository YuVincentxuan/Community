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
                    <el-menu :default-active="this.$router.path" class="el-menu-demo" router mode="horizontal">
                        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
                            {{item.navItem}}
                        </el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :xs="6" :sm="6" :md="8" :lg="7" class="rightNav">
                    <div>
                        <router-link to="/write">
                        <el-button class="follow-btn" size="mini" type="success">写博客</el-button>
                        </router-link>
                    </div>
                    <div class="lo-re-box">
                        <router-link to="/login" v-if="true">登录</router-link>
                        <div class="isLogin" v-else>
                            <img :src="this.$store.state.myHeaderImg" >
                            <el-dropdown trigger="click">
                                <span class="el-dropdown-link">
                                    <span class="username">{{}}</span> <i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item><span @click="loginOut">注销</span></el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <!-- <span>|</span>
                        <a href="javascrit:;">注册</a> -->
                    </div>
                </el-col>   
            </el-col>
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :offset="6" class="showBtn">
                <div class="rightNav">
                <el-button class="showDrawer" @click="drawer = true" type="primary" style="margin-left: 16px;" icon="el-icon-s-fold">
                </el-button>
                </div>
                <el-drawer
                    title="导航"
                    :visible.sync="drawer"
                    direction="ltr"
                    size="50%"
                    >
                    <el-menu :default-active="this.$router.path" class="el-menu-demo" router mode="horizontal">
                        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
                            {{item.navItem}}
                        </el-menu-item>
                    </el-menu>


                </el-drawer>

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
        drawer: false,
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
    z-index:100;
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
.el-menu{
    border:none;
}
.el-menu-item a{
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
}
.rightNav{
    position: absolute;
    right: 20px;
    height: 60px;
}
.lo-re-box{
    margin-left: 20px;
}
.rightNav a{
    font-size: 14px;
    width: 30px;
    text-decoration: none;
    color: rgb(4, 61, 168);
}
.rightNav a:hover{
    text-decoration: underline blue;
}
.isLogin{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.isLogin img{
    width: 30px;
    border-radius: 50%;
    margin-right: 10px;
}
.el-dropdown .username{
    display: inline-block;
    width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
}
.lo-re-box-mobile .username{
    width: 100%;
}
span.nav-on{
    display:none;
    width:25px;
    position: absolute;
    top:20px;
    right:12px;
    cursor: pointer;
}
.nav-on i{
    display:block;
    width:100%;
    height:2px;
    background:rgb(137, 167, 192);
    border-radius: 1px;
    margin-bottom:5px;
} 
.collaps-nav{
    margin-top: 60px;
    display: none;
}
.showBtn{
    display none
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
    .showBtn{
        display inline
    }
    .showDrawer{
        vertical-align middle
        font-size 25px
        padding 5px 10px
    }
}
</style>