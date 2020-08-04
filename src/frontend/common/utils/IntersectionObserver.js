import _findIndex from 'lodash/findIndex.js'

const SUPPORTED = typeof window.IntersectionObserver !== 'undefined' ? true : false;
let OBSERVED, OBSERVER;

if(SUPPORTED){
  OBSERVED = [];
  OBSERVER = new IntersectionObserver((changes) => {
    let change, index;
    for(const i in changes){
      change = changes[i];
      if(change.isIntersecting){
        OBSERVER.unobserve(change.target);
        index = _findIndex(OBSERVED, {elem: change.target});
        if(index !== -1){
          OBSERVED[index].cb();
          delete OBSERVED[index];
        }
      }
    }
  }, {
    rootMargin: '50%',
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
  observe(elem, cb) {
    if(SUPPORTED){
      OBSERVER.observe(elem);
      OBSERVED.push({ elem: elem, cb: cb });
    } else {
      cb();
    }
  },
}
