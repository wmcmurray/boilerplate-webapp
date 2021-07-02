import _debounce from 'lodash/debounce.js'

let _onResizeDebounced = null;

/**
* Implements a check of window resize event
* NOTE: meant to be added on the root app only, like a singleton
*
* May emit those events :
* - window-resize : when the window gets resized
*/
export default {
  mounted() {
    if(!_onResizeDebounced) {
      const _onResize = () => {
        this.$store.commit('SET_WINDOW_WIDTH', window.innerWidth);
        this.$store.commit('SET_WINDOW_HEIGHT', window.innerHeight);
        this.$root.$emit('window-resize');
      };
      _onResizeDebounced = _debounce(_onResize, 50);

      window.addEventListener('resize', _onResizeDebounced);
      _onResize();
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', _onResizeDebounced);
    _onResizeDebounced = null;
  },
}
