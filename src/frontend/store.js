import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// load modules
import jsVars from 'ROOT/store/jsVars'

// create the Vuex instance with initial state and modules
export default new Vuex.Store({
  // state       : {},
  // getters     : {},
  // mutations   : {},
  // actions     : {},
  modules: {
    jsVars: jsVars,
  },
})
