<template>
	<content-loader
		:height="160"
		:width="_width"
		:speed="2"
		primaryColor="#ececec"
		secondaryColor="#d5d2d2"
	>
        <circle cx="101" cy="38" r="8" /> 
        <rect x="116" y="33" rx="5" ry="5" width="220" height="10" /> 
        <circle cx="101" cy="68" r="8" /> 
        <rect x="116" y="63" rx="5" ry="5" width="220" height="10" /> 
        <circle cx="101" cy="98" r="8" /> 
        <rect x="116" y="93" rx="5" ry="5" width="220" height="10" /> 
        <circle cx="101" cy="128" r="8" /> 
        <rect x="116" y="123" rx="5" ry="5" width="220" height="10" /> 
        <circle cx="43" cy="56" r="38" />
	</content-loader>
</template>
<script>
  import { ContentLoader } from "vue-content-loader"
  export default {
      name:'InforLoader',
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
