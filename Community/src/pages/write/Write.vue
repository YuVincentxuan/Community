<template>
    <div class="content">
       <mavon-editor v-model="value" ></mavon-editor>
    </div>

</template>

<script>

export default {
    name:'Write',
    data() {
    return {
        value: '',
        defaultData: "preview"
    };
    },
    methods:{
    }
}
</script>

<style lang="stylus" scoped>
.content
    top 70px
    position relative
    height 90vh
    .v-note-wrapper
        height 100%
        z-index 55
</style>