import _debounce from 'lodash/debounce.js'

/**
* Implements a check of window resize event
*
* May emit those events :
* - window-resize : when the window gets resized
*/
export default {
  data: function() {
    return {
      _windowResizeDisabled: false,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    };
  },
  methods: {
    _onWindowResizeHandler: function() {
      if(!this._windowResizeDisabled){
        this.$set(this, 'windowWidth', window.innerWidth);
        this.$set(this, 'windowHeight', window.innerHeight);
        this.$emit('window-resize');
      }
    },
  },
  mounted: function() {
    this._windowResizeDebounced = _debounce(this._onWindowResizeHandler.bind(this), 50);
    window.addEventListener('resize', this._windowResizeDebounced);
  },
  activated: function() {
    this._windowResizeDisabled = false;
    this._onWindowResizeHandler();
  },
  deactivated: function() {
    this._windowResizeDisabled = true;
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this._windowResizeDebounced);
  },
}
