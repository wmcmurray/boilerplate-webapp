import IntersectionObserver from 'COMMON/utils/IntersectionObserver.js'

/**
* Implements a check of if this component is in the viewport or not
*/
export default {
  data() {
    return {
      isInViewport: false,
    };
  },
  mounted() {
    this._viewportObserverWatchObj = IntersectionObserver.watchEnteredOrExitedViewport(this.$el, (inViewport) => {
      this.isInViewport = inViewport;
    });
  },
  beforeDestroy() {
    this._viewportObserverWatchObj.off();
  },
}
