<template>
	<content-loader
		:height="160"
		:width="_width"
		:speed="2"
		primaryColor="#ececec"
		secondaryColor="#d5d2d2"
	>
		<circle cx="31" cy="27" r="8" /> 
		<rect x="46" y="22" rx="5" ry="5" width="220" height="10" /> 
		<circle cx="31" cy="57" r="8" /> 
		<rect x="46" y="52" rx="5" ry="5" width="220" height="10" /> 
		<circle cx="31" cy="87" r="8" /> 
		<rect x="46" y="82" rx="5" ry="5" width="220" height="10" /> 
		<circle cx="31" cy="117" r="8" /> 
		<rect x="46" y="112" rx="5" ry="5" width="220" height="10" />
	</content-loader>
</template>
<script>
  import { ContentLoader } from "vue-content-loader"
  export default {
      name:'ListLoader',
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
