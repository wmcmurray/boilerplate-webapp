import _debounce from 'lodash/debounce.js'

/**
* Implements listeners for window scroll
*
* May emit those events :
* - window-scroll : when the user scrolled in the window
*/
export default {
  data: function() {
    return {
      scrollTop: this.getScrollTop(),
    };
  },
  methods: {
    getScrollTop: function() {
      return window.document.body.scrollTop || window.document.documentElement.scrollTop;
    }
  },
  mounted: function() {
    this._windowScrollDebounced = _debounce(function(){
      this.$set(this, 'scrollTop', this.getScrollTop());
      this.$emit('window-scroll');
    }.bind(this), 10);

    window.addEventListener('scroll', this._windowScrollDebounced);
  },
  beforeDestroy: function() {
    window.removeEventListener('scroll', this._windowScrollDebounced);
  },
}
