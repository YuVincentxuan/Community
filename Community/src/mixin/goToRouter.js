export default {
    data() {
     return {
      name: 'goToRouter'
     }
    },
    methods: {
        goToLabel(label){
            this.$router.push({
                name:'Label',
                params:{
                    label: label
                }
            })
        },
        goToArticle(id, title){
            this.$router.push({
                name: 'Article',
                params:{
                    id : id,
                    title: title
                }
            })
        },
        goToUser(id,title){
        this.$router.push({
                name:'User',
                params:{
                    id: id,
                    title: title
                }
            })
        },
        goToArticle(id, title){
            let router = this.$router.resolve({
                name: 'Article',
                params:{
                    id : id,
                    title: title
                }
            })
            window.open(router.href, '_blank')
        },
    }
}