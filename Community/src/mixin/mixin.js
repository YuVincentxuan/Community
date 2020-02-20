export default {
    data() {
     return {
      name: 'ButtonDebounce'
     }
    },
    methods: {
        debounce(fn, wait){
            var timeout = null;
            return function(){
                if(timeout !== null)
                    clearInterval(timeout)
                timeout = setTimeout(fn, wait)
            }
        }
    }
}