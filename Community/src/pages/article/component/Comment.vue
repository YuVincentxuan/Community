<template>
    <div>
        <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply">
            <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
                <div class="reply-info" >
                    <div 
                    tabindex="0" 
                    contenteditable="true" 
                    id="replyInput" 
                    spellcheck="false" 
                    placeholder="输入评论..." 
                    class="reply-input" 
                    @focus="showReplyBtn"  
                    @input="onDivInput($event)"
                    >
                    </div>
                    <div class="reply-btn-box" v-show="btnShow">
                        <el-button class="reply-btn" size="medium" @click="sendComment" type="primary">发表评论</el-button>
                    </div>
                </div>
        </div>
        <div v-for="(item,i) in comments" :key="item.i" class="author-title reply-father">
            <el-avatar class="header-img" :size="40" :src="item.commentImg"></el-avatar>
            <div class="author-info">
                <span class="author-name">{{item.plName}}</span>
                <span class="author-time">{{dateStr(item.date)}}</span>
            </div>
            <div class="icon-btn">
                <span @click="showReplyInput(i,item.plName,item.self_id),addLike(i)"><i class="iconfont el-icon-s-comment"></i></span>
                <span @click="addLike(i)"><i class="iconfont el-icon-caret-top" :class="{'redLike':item.likeTag}"></i>{{item.zNumber}}</span>
            </div>
            <div class="talk-box">
                <p>
                    <span class="reply">{{item.plContent}}</span>
                </p>
            </div>
            
            <div class="reply-box">
                <div v-for="(reply,j) in item.reply" :key="j" class="author-title">
                    <el-avatar class="header-img" :size="40" :src="reply.fromHeadImg"></el-avatar>
                    <div class="author-info">
                        <span class="author-name">{{reply.plName}}</span>
                        <span class="author-time">{{dateStr(reply.date)}}</span>
                    </div>
                    <div class="icon-btn">
                        <span @click="showReplyInput(i,reply.plName,reply.self_id),addreplyLike(i,j)"><i class="iconfont el-icon-s-comment"></i></span>
                        <span @click="addreplyLike(i,j)"><i class="iconfont el-icon-caret-top" :class="{'redLike':reply.likeTag}"></i>{{reply.zNumber}}</span>
                    </div>
                    <div class="talk-box">
                        <p>
                            <span>回复 {{reply.atName}}:</span>
                            <span class="reply">{{reply.plContent}}</span>
                        </p>
                    </div>
                    <div class="reply-box">

                    </div>
                </div>
            </div>
            <div  v-show="comments[i].inputShow" class="my-reply my-comment-reply">
                <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
                <div class="reply-info" >
                    <div tabindex="0" contenteditable="true" spellcheck="false" :placeholder="_placeholder"   @input="onDivInput($event)"  class="reply-input reply-comment-input"></div>
                    <div class=" reply-btn-box">
                        <el-button class="reply-btn" size="medium" @click="sendCommentReply(i,j)" type="primary">发表评论</el-button>
                    </div>
                </div>
        </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
    function documentHandler(e) {
    // 这里判断点击的元素是否是本身，是本身，则返回
        if (el.contains(e.target)) {
            return false;
        }
    // 判断指令中是否绑定了函数
        if (binding.expression) {
            // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
            binding.value(e);
        }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler;
    document.addEventListener('click', documentHandler);
    },
    update() {},
    unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.vueClickOutside);
    delete el.vueClickOutside;
  },
};
export default {
    name:'ArticleComment',
    // props:{
    //     comments:Array
    // },
    data(){
        return{
            btnShow: false,
            index:'0',
            replyComment:'',
            myName:'Lana Del Rey',
            myHeader:'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
            myId:19870621,
            to:'',
            toId:-1,
            _placeholder:'',
            show: 1,
            showNum:false,
            comments:[]
            // comments:[
            //     {
            //         name:'Lana Del Rey',
            //         id:19870621,
            //         headImg:'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
            //         comment:'我发布一张新专辑Norman Fucking Rockwell,大家快来听啊',
            //         time:'2019年9月16日 18:43',
            //         commentNum:2,
            //         like:15,
            //         inputShow:false,
            //         likeTag:true,
            //         reply:[
            //             {
            //                 from:'Taylor Swift',
            //                 fromId:19891221,
            //                 fromHeadImg:'https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg',
            //                 to:'Lana Del Rey',
            //                 toId:19870621,
            //                 comment:'我很喜欢你的新专辑！！',
            //                 time:'2019年9月16日 18:43',
            //                 commentNum:1,
            //                 like:15,
            //                 inputShow:false,
            //                 likeTag:true,
            //             },
            //             {
            //                 from:'Ariana Grande',
            //                 fromId:1123,
            //                 fromHeadImg:'https://ae01.alicdn.com/kf/Hf6c0b4a7428b4edf866a9fbab75568e6U.jpg',
            //                 to:'Lana Del Rey',
            //                 toId:19870621,
            //                 comment:'别忘记宣传我们的合作单曲啊',
            //                 time:'2019年9月16日 18:43',
            //                 commentNum:0,
            //                 like:5,
            //                 inputShow:false,
            //                 likeTag:true
            //             }
            //         ]
            //     },
            //     {
            //         name:'Taylor Swift',
            //         id:19891221,
            //         headImg:'https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg',
            //         comment:'我发行了我的新专辑Lover',
            //         time:'2019年9月16日 18:43',
            //         commentNum:1,
            //         like:5,
            //         inputShow:false,
            //         likeTag:true,
            //         reply:[
            //             {
            //                 from:'Lana Del Rey',
            //                 fromId:19870621,
            //                 fromHeadImg:'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
            //                 to:'Taylor Swift',
            //                 toId:19891221,
            //                 comment:'新专辑和speak now 一样棒！',
            //                 time:'2019年9月16日 18:43',
            //                 commentNum:25,
            //                 like:5,
            //                 inputShow:false,
            //                 likeTag:true
            //             }
            //         ]
            //     },
            //     {
            //         name:'Norman Fucking Rockwell',
            //         id:20190830,
            //         headImg:'https://ae01.alicdn.com/kf/Hdd856ae4c81545d2b51fa0c209f7aa28Z.jpg',
            //         comment:'Plz buy Norman Fucking Rockwell on everywhere',
            //         time:'2019年9月16日 18:43',
            //         commentNum:0,
            //         like:5,
            //         inputShow:false,
            //         likeTag:true,
            //         reply:[]
            //     },
            // ]
        }
    },
    directives: {clickoutside},
    methods: {
        getComment(){
            axios.get('http://blog.swpuiot.com/getArticleComments?articleId='+this.$route.params.id)
            .then(res => {
                res = res.data
                if(res.code == 200){
                    this.comments = res.data.comment
                    this.comments.forEach(function(item, index){
                        item.inputShow = false
                        if(item.reply != null){
                            item.reply.forEach(function(val, idx){
                                val.inputShow = false
                            })
                        }
                    })
                    console.log(this.comments)
                }
                
            })
        },
        inputFocus(){
            var replyInput = document.getElementById('replyInput');
            replyInput.style.padding= "8px 8px"
            replyInput.style.border ="2px solid blue"
            replyInput.focus()
        },  
        showReplyBtn(){
            this.btnShow = true
        },
        hideReplyBtn(){
            this.btnShow = false
            replyInput.style.padding= "10px"
            replyInput.style.border ="none"
        },
        showReplyInput(i,name,id){
            this.comments[this.index].inputShow = false
            this.index =i
            this.comments[i].inputShow = true
            this.to = name
            this.toId = id
            this._placeholder = '回复'+ name +':' 
            this.$nextTick()
        },
        sendComment(){
            if(!this.replyComment){
                 this.$message({
                    showClose: true,
                    type:'warning',
                    message:'评论不能为空'
                })
            }else{
                let a ={}
                let input =  document.getElementById('replyInput')
                let timeNow = new Date().getTime();
                let time= this.dateStr(timeNow);
                a.plName= this.myName
                a.plContent =this.replyComment
                a.commentImg = this.myHeader
                a.date = time
                a.commentNum = 0
                a.zNumber = 0
                a.reply = []
                this.comments.push(a)
                this.replyComment = ''
                input.innerHTML = '';

            }
        },
        sendCommentReply(i,j){
            if(!this.replyComment){
                 this.$message({
                    showClose: true,
                    type:'warning',
                    message:'评论不能为空'
                })
            }else{
                let a ={}
                let timeNow = new Date().getTime();
                let time= this.dateStr(timeNow);
                a.plName= this.myName
                a.atName = this.to
                a.fromHeadImg = this.myHeader
                a.plContent =this.replyComment
                a.time = time
                a.commentNum = ''
                a.zNumber = 0
                this.comments[i].reply.push(a)
                this.replyComment = ''
                document.getElementsByClassName("reply-comment-input")[i].innerHTML = ""
                this.comments[i].inputShow = false
            }
        },
        onDivInput: function(e) {
            this.replyComment = e.target.innerHTML;
        },
        dateStr(date){
            //获取js 时间戳
            var time=new Date().getTime();
            //去掉 js 时间戳后三位，与php 时间戳保持一致
            time=parseInt((time-date)/1000);
            //存储转换值 
            var s;
            if(time<60*10){//十分钟内
                return '刚刚';
            }else if((time<60*60)&&(time>=60*10)){
                //超过十分钟少于1小时
                s = Math.floor(time/60);
                return  s+"分钟前";
            }else if((time<60*60*24)&&(time>=60*60)){ 
                //超过1小时少于24小时
                s = Math.floor(time/60/60);
                return  s+"小时前";
            }else if((time<60*60*24*30)&&(time>=60*60*24)){ 
                //超过1天少于30天内
                s = Math.floor(time/60/60/24);
                return s+"天前";
            }else{ 
                //超过30天ddd
                var date= new Date(parseInt(date));
                return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
            }
        },
        addLike(i,j){
            if(this.comments[i].likeTag){
                this.comments[i].zNumber -=1
                this.comments[i].likeTag = false
            }else{
                this.comments[i].zNumber +=1      
                this.comments[i].likeTag = true              
            }
        },
        addreplyLike(i,j){
            if(this.comments[i].reply[j].likeTag){
                this.comments[i].reply[j].zNumber -=1
                this.comments[i].reply[j].likeTag = false
            }else{
                this.comments[i].reply[j].zNumber +=1      
                this.comments[i].reply[j].likeTag = true              
            }
        }
    },
    mounted(){
        this.getComment()
    }
}
</script>
<style lang="stylus" scoped>
.my-reply
    padding 10px
    background-color #fafbfc
    .header-img
        display inline-block
        vertical-align top
    .reply-info    
        display inline-block
        margin-left 5px
        width 90%
        @media screen and (max-width:1200px) {
            width 80%
        }
        .reply-input
            min-height 20px
            line-height 22px
            padding 10px 10px
            color #ccc
            background-color #fff
            border-radius 5px
            &:empty:before
                content attr(placeholder)
            &:focus:before
                content none
            &:focus
                padding 8.4px 8px
                border 2px solid blue
                box-shadow none
                outline none
    .reply-btn-box
        height 25px
        margin 10px 0
        .reply-btn
            position relative
            float right
.my-comment-reply
    margin-left 50px
    .reply-input
        width flex
.author-title:not(:last-child)
    border-bottom: 1px solid rgba(178,186,194,.3)
.author-title
    padding 10px
    .header-img
        display inline-block
        vertical-align top
    .author-info
        display inline-block
        margin-left 5px
        width 60%
        height 40px
        line-height 20px
        >span 
            display block
            cursor pointer
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
        .author-name
            color #000
            font-size 18px
            font-weight bold
        .author-time
            font-size 14px
    .icon-btn
        width 30%
        padding 0 !important 
        float right
        @media screen and (max-width : 1200px){
            width 20%
            padding 7px
        }
        >span 
            cursor pointer
        .iconfont 
            margin 0 5px
        .redLike
            color red
    .talk-box
        margin 0 50px
        >p
           margin 0
        .reply
            font-size 16px
            color #000
    .reply-box
        margin 10px 0 0 50px
        background-color #efefef
</style>