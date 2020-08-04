/**
* Implements a check of the window's focused or blured state
*
* May emit those events :
* - window-focus  : when the window receives focus
* - window-blur   : when the window loose focus
*/
export default {
  data() {
    return {
      windowHasFocus: window.document.hasFocus() || true,
    };
  },
  methods: {
    _onWindowFocusHandler() {
      this.windowHasFocus = true;
      this.$emit('window-focus');
    },
    _onWindowBlurHandler() {
      this.windowHasFocus = false;
      this.$emit('window-blur');
    },
  },
  mounted() {
    window.addEventListener('focus', this._onWindowFocusHandler);
    window.addEventListener('blur', this._onWindowBlurHandler);
  },
  beforeDestroy() {
    window.removeEventListener('focus', this._onWindowFocusHandler);
    window.removeEventListener('blur', this._onWindowBlurHandler);
  },
}
