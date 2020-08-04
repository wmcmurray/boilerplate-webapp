import _debounce from 'lodash/debounce.js'

/**
* Implements listeners for window scroll
*
* May emit those events :
* - window-scroll : when the user scrolled in the window
*/
export default {
  data() {
    return {
      scrollTop: this.getScrollTop(),
    };
  },
  methods: {
    getScrollTop() {
      return window.document.body.scrollTop || window.document.documentElement.scrollTop;
    }
  },
  mounted() {
    this._windowScrollDebounced = _debounce(() => {
      this.$set(this, 'scrollTop', this.getScrollTop());
      this.$emit('window-scroll');
    }, 10);

    window.addEventListener('scroll', this._windowScrollDebounced);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this._windowScrollDebounced);
  },
}
