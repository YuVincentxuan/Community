<template>
	<content-loader
		:height="160"
		:width="_width"
		:speed="2"
		primaryColor="#ececec"
		secondaryColor="#d5d2d2"
	>
		<rect x="89" y="29" rx="4" ry="4" width="117" height="6.4" /> 
		<rect x="89" y="49" rx="3" ry="3" width="85" height="6.4" /> 
		<rect x="19" y="94" rx="3" ry="3" width="350" height="6.4" /> 
		<rect x="19" y="114" rx="3" ry="3" width="380" height="6.4" /> 
		<rect x="19" y="134" rx="3" ry="3" width="201" height="6.4" /> 
		<circle cx="49" cy="44" r="30" />
	</content-loader>
</template>
<script>
  import { ContentLoader } from "vue-content-loader"
  export default {
      name:'ArticleLoader',
    components: {
      ContentLoader
	},
	computed:{
		_width:function(){
			if(document.body.clientWidth <= 667){
            return '400px'
          }else{
            return '500px'
          }
		}
	}
  }
</script>
