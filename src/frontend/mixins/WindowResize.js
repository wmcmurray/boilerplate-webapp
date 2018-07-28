import _debounce from 'lodash/debounce'

/**
* Implements a check of window resize event
*
* May emit those events :
* - window-resize : when the window gets resized
*/
export default {
  data: function() {
    return {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    };
  },
  mounted: function() {
    this._windowResizeDebounced = _debounce(function(){
      this.$set(this, 'windowWidth', window.innerWidth);
      this.$set(this, 'windowHeight', window.innerHeight);
      this.$emit('window-resize');
    }.bind(this), 50);

    window.addEventListener('resize', this._windowResizeDebounced);
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this._windowResizeDebounced);
  },
}
