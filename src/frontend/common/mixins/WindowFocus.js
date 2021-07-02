let _onFocus = null;
let _onBlur = null;

/**
* Implements a check of the window's focused or blured state
* NOTE: meant to be added on the root app only, like a singleton
*
* May emit those events :
* - window-focus  : when the window receives focus
* - window-blur   : when the window loose focus
*/
export default {
  mounted() {
    if(!_onFocus) {
      _onFocus = () => {
        this.$store.commit('SET_WINDOW_FOCUS_STATE', true);
        this.$root.$emit('window-focus');
      };
      window.addEventListener('focus', _onFocus);
    }

    if(!_onBlur) {
      _onBlur = () => {
        this.$store.commit('SET_WINDOW_FOCUS_STATE', false);
        this.$root.$emit('window-blur');
      };
      window.addEventListener('blur', _onBlur);
    }
  },
  beforeDestroy() {
    if(_onFocus) {
      window.removeEventListener('focus', _onFocus);
      _onFocus = null;
    }

    if(_onBlur) {
      window.removeEventListener('blur', _onBlur);
      _onBlur = null;
    }
  },
}
