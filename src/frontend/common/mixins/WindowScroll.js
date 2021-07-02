import _debounce from 'lodash/debounce.js'

let _onScrollDebounced = null;

/**
* Implements listeners for window scroll
* NOTE: meant to be added on the root app only, like a singleton
*
* May emit those events :
* - window-scroll : when the user scrolled in the window
*/
export default {
  mounted() {
    if(!_onScrollDebounced) {
      const _onScroll = () => {
        this.$store.commit('SET_SCROLL_TOP', window.document.body.scrollTop || window.document.documentElement.scrollTop);
        this.$root.$emit('window-scroll');
      };
      _onScrollDebounced = _debounce(_onScroll, 10);

      window.addEventListener('scroll', _onScrollDebounced);
      _onScroll();
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', _onScrollDebounced);
    _onScrollDebounced = null;
  },
}
