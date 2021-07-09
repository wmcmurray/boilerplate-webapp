/**
* Implements a way to know the width and height of this component
*/
export default {
  data() {
    return {
      boundingWidth: 0,
      boundingHeight: 0,
    };
  },
  mounted() {
    let bb;

    this._sizeAwarenessOnResizeCb = () => {
      bb = this.$el.getBoundingClientRect();
      this.$set(this, 'boundingWidth', bb.width);
      this.$set(this, 'boundingHeight', bb.height);
    };

    this.$root.$on('window-resize', this._sizeAwarenessOnResizeCb);
    this._sizeAwarenessOnResizeCb();
  },
  beforeDestroy() {
    if(this._sizeAwarenessOnResizeCb) {
      this.$root.$off('window-resize', this._sizeAwarenessOnResizeCb);
    }
  },
}
