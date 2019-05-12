/**
* Implements methods to track multiple stuff loading at the same time
*/
export default {
  data: function() {
    return {
      loadingStates: {},
    };
  },
  computed: {
    loading: function() {
      for(var i in this.loadingStates){
        if(this.loadingStates[i] === true){
          return true;
        }
      }
      return false;
    }
  },
  methods: {
    startLoading: function(key) {
      if(typeof key === 'undefined'){key = 'main';}
      this.$set(this.loadingStates, key, true);
    },
    stopLoading: function(key) {
      if(typeof key === 'undefined'){key = 'main';}
      this.$set(this.loadingStates, key, false);
    },

    /**
     * Check if the specified item is loading
     * NOTE : a wildcard can be used (ex: "fetch-*", "*-fetched", etc)
     */
    isLoading(key) {
      if(typeof key === 'undefined'){key = 'main';}

      // try to match exact key
      if(typeof this.loadingStates[key] !== 'undefined' && this.loadingStates[key]){
        return true;
      }

      // attempt to match wilcard (if at least 1 wildcard found)
      var keySplited = key.split('*');
      if(keySplited.length > 1){
        var reg = new RegExp('^' + keySplited.join('.*') + '$');
        for(var kii in this.loadingStates){
          if(reg.test(kii) && this.loadingStates[kii]){
            return true;
          }
        }
      }

      return false;
    },

    /**
     * Check if at least one item is loading
     */
    isLoadingAny: function(keys) {
      for(var i in keys){
        if(this.isLoading(keys[i])){
          return true;
        }
      }
      return false;
    },
  },
}
