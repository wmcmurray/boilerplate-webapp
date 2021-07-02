import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// load modules
import uiState from 'ROOT/store/uiState'
import windowState from 'ROOT/store/windowState'

// create the Vuex instance with initial state and modules
export default new Vuex.Store({
  // state       : {},
  // getters     : {},
  // mutations   : {},
  // actions     : {},
  modules: {
    uiState: uiState,
    windowState: windowState,
  },
})
