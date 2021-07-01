export default {
  state : {
    mainMenuOpened: false,
  },

  getters : {
    mainMenuOpened(state){
      return state.mainMenuOpened;
    },
  },

  mutations : {
    SET_MAIN_MENU_OPENED_STATE(state, value) {
      state.mainMenuOpened = value;
    },
  },

  actions : {
    openMainMenu(store){
      store.commit('SET_MAIN_MENU_OPENED_STATE', true);
    },
    closeMainMenu(store){
      store.commit('SET_MAIN_MENU_OPENED_STATE', false);
    },
    toggleMainMenu(store){
      store.commit('SET_MAIN_MENU_OPENED_STATE', !store.state.mainMenuOpened);
    },
  },
}
