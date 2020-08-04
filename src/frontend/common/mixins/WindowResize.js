import _debounce from 'lodash/debounce.js'

/**
* Implements a check of window resize event
*
* May emit those events :
* - window-resize : when the window gets resized
*/
export default {
  data() {
    return {
      _windowResizeDisabled: false,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    };
  },
  methods: {
    _onWindowResizeHandler() {
      if(!this._windowResizeDisabled){
        this.$set(this, 'windowWidth', window.innerWidth);
        this.$set(this, 'windowHeight', window.innerHeight);
        this.$emit('window-resize');
      }
    },
  },
  mounted() {
    this._windowResizeDebounced = _debounce(this._onWindowResizeHandler.bind(this), 50);
    window.addEventListener('resize', this._windowResizeDebounced);
  },
  activated() {
    this._windowResizeDisabled = false;
    this._onWindowResizeHandler();
  },
  deactivated() {
    this._windowResizeDisabled = true;
  },
  beforeDestroy() {
    window.removeEventListener('resize', this._windowResizeDebounced);
  },
}
