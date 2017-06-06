import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// the root, initial state object
var state = {
}

// define the possible mutations that can be applied to our state
var mutations = {
}

// create the Vuex instance by combining the state and mutations objects
// then export the Vuex store for use by our components
export default new Vuex.Store({
  state: state,
  mutations: mutations
})
