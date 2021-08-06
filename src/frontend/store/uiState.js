// import dayjs from 'dayjs'
import I18n from 'ROOT/i18n.js'

export default {
  state : {
    mainMenuOpened: false,
    availableLocales: Object.keys(I18n.messages),
    currentLocale: I18n.locale,
  },

  getters : {
    mainMenuOpened(state){
      return state.mainMenuOpened;
    },
    availableLocales(state){
      return state.availableLocales;
    },
    currentLocale(state){
      return state.currentLocale;
    },
  },

  mutations : {
    SET_MAIN_MENU_OPENED_STATE(state, value) {
      state.mainMenuOpened = value;
    },
    SET_CURRENT_LOCALE(state, locale) {
      state.currentLocale = locale;
      JS_VARS.locale = locale;
      I18n.locale = locale;
      // dayjs.locale(locale);
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
    setCurrentLocale(store, locale){
      store.commit('SET_CURRENT_LOCALE', locale);
    },
  },
}
