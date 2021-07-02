import _findIndex from 'lodash/findIndex.js'

const SUPPORTED = typeof window.IntersectionObserver !== 'undefined' ? true : false;
let OBSERVER_ENTER_VIEWPORT, OBSERVED_ENTER_VIEWPORT;
let OBSERVER_STATE_CHANGED, OBSERVED_STATE_CHANGED;

if(SUPPORTED){
  // handles when things are about to enters viewport
  OBSERVED_ENTER_VIEWPORT = [];
  OBSERVER_ENTER_VIEWPORT = new IntersectionObserver((changes) => {
    let change, index;
    for(let i = 0; i < changes.length; i++){
      change = changes[i];

      if(change.isIntersecting){
        index = _findIndex(OBSERVED_ENTER_VIEWPORT, {elem: change.target});
        if(index !== -1){
          OBSERVER_ENTER_VIEWPORT.unobserve(change.target);
          OBSERVED_ENTER_VIEWPORT[index].cb();
          delete OBSERVED_ENTER_VIEWPORT[index];
        }
      }
    }
  }, {
    rootMargin: '50%',
  });

  // handles precise enter/exit of vieport
  OBSERVED_STATE_CHANGED = [];
  OBSERVER_STATE_CHANGED = new IntersectionObserver((changes) => {
    let change, index;
    for(let i = 0; i < changes.length; i++){
      change = changes[i];

      index = _findIndex(OBSERVED_STATE_CHANGED, {elem: change.target});
      if(index !== -1){
        OBSERVED_STATE_CHANGED[index].cb(change.isIntersecting);
      }
    }
  });
}

/**
 * Enable us to trigger a callback when a DOM element enters in the viewport
 * DOC : https://developers.google.com/web/updates/2016/04/intersectionobserver
 */
export default {
  /**
   * Check when the element enters viewport then trigger the callback when it happens
   * NOTE : will trigger the callback imediately if this browser feature is not supported
   */
  onceAboutToEnterViewport(elem, cb) {
    if(SUPPORTED){
      OBSERVER_ENTER_VIEWPORT.observe(elem);
      OBSERVED_ENTER_VIEWPORT.push({ elem: elem, cb: cb });
    } else {
      cb();
    }
  },

  /**
   * Trigger the callback when the element enters or exits viewport
   * NOTE : will trigger the callback imediately if this browser feature is not supported
   */
  watchEnteredOrExitedViewport(elem, cb) {
    if(SUPPORTED){
      OBSERVER_STATE_CHANGED.observe(elem);
      OBSERVED_STATE_CHANGED.push({ elem: elem, cb: cb });
    } else {
      cb(true);
    }

    return {
      off() {
        OBSERVER_STATE_CHANGED.unobserve(elem);

        const index = _findIndex(OBSERVED_STATE_CHANGED, {elem: elem});
        if(index !== -1){
          delete OBSERVED_STATE_CHANGED[index];
        }
      },
    };
  },
}
