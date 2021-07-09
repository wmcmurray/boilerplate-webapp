export default {
  state : {
    windowHasFocus: window.document.hasFocus() || true,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    scrollTop: 0,
    scrollLeft: 0,
  },

  getters : {
    windowHasFocus(state){
      return state.windowHasFocus;
    },
    windowWidth(state){
      return state.windowWidth;
    },
    windowHeight(state){
      return state.windowHeight;
    },
    scrollTop(state){
      return state.scrollTop;
    },
    scrollLeft(state){
      return state.scrollLeft;
    },
  },

  mutations : {
    SET_WINDOW_FOCUS_STATE(state, value) {
      state.windowHasFocus = value;
    },
    SET_WINDOW_WIDTH(state, value) {
      state.windowWidth = value;
    },
    SET_WINDOW_HEIGHT(state, value) {
      state.windowHeight = value;
    },
    SET_SCROLL_TOP(state, value) {
      state.scrollTop = value;
    },
    SET_SCROLL_LEFT(state, value) {
      state.scrollLeft = value;
    },
  },
}
