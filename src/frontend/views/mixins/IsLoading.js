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
    startLoading: function(key = 'main') {
      this.$set(this.loadingStates, key, true);
    },
    stopLoading: function(key = 'main') {
      this.$set(this.loadingStates, key, false);
    },
    isLoading: function(key = 'main') {
      return typeof this.loadingStates[key] !== 'undefined' && this.loadingStates[key] ? true : false;
    },
  },
}
