import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        myName:'',
        myHeaderImg:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        myId:'',
        headerNav:'/',
    },
    mutations:{
        change_headerNav(state, headerNav){
            state.headerNav = headerNav
        }
    }
})