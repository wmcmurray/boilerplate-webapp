/**
* Implements a check of the window's focused or blured state
*
* May emit those events :
* - window-focus  : when the window receives focus
* - window-blur   : when the window loose focus
*/
export default {
  data: function() {
    return {
      windowHasFocus: window.document.hasFocus() || true,
    };
  },
  methods: {
    _onWindowFocusHandler: function() {
      this.windowHasFocus = true;
      this.$emit('window-focus');
    },
    _onWindowBlurHandler: function() {
      this.windowHasFocus = false;
      this.$emit('window-blur');
    },
  },
  mounted: function() {
    window.addEventListener('focus', this._onWindowFocusHandler);
    window.addEventListener('blur', this._onWindowBlurHandler);
  },
  beforeDestroy: function() {
    window.removeEventListener('focus', this._onWindowFocusHandler);
    window.removeEventListener('blur', this._onWindowBlurHandler);
  },
}
