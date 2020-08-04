<template>
  <transition name="reveal">
    <div v-if="shown && targetElem" class="scroll-to-top-btn" @click="action">
      <div class="inside">
        <icon :name="iconName" />
      </div>
    </div>
  </transition>
</template>

<script>
import WindowScrollMixin from 'COMMON/mixins/WindowScroll.js';
import WindowResizeMixin from 'COMMON/mixins/WindowResize.js';

/**
 * Displays a button (in bottom right corner) that enables the user to scroll back to top quickly
*/
export default {
  name: 'scroll-to-top-btn',
  mixins: [
    WindowScrollMixin,
    WindowResizeMixin,
  ],
  props: {
    target: {
      type: String,
      default: 'body',
    },
  },
  data(){
    return {
      targetElem: null,
      rawDistance: null,
    };
  },
  computed: {
    shown(){
      if(this.distance > this.windowHeight){
        return true;
      }
      return false;
    },
    distance(){
      return this.rawDistance < 0 ? -this.rawDistance : this.rawDistance;
    },
    direction(){
      return this.rawDistance < 0 ? 1 : -1;
    },
    iconName(){
      return this.direction > 0 ? 'chevron-up' : (this.direction < 0 ? 'chevron-down' : '');
    },
  },
  mounted(){
    if(typeof this.target === 'string'){
      this.targetElem = document.querySelector(this.target);
    }
  },
  methods: {
    action(){
      this.$SmoothScroll(this.targetElem);
    },
  },
  watch: {
    scrollTop(nv){
      if(!this.targetElem || typeof this.targetElem.getBoundingClientRect === 'undefined'){
        return;
      }
      this.rawDistance = this.targetElem.getBoundingClientRect().top;
    },
  }
}
</script>

<style lang="scss">
@import "~COMMON/styles/config.scss";

.scroll-to-top-btn {
  $hiddenOf: 10px;
  $padding: $globalPadding * 0.5;

  position: fixed;
  right: $globalPadding * 1.5;
  bottom: -1px;
  z-index: 99999;

  .inside {
    position: relative;
    bottom: -$hiddenOf;
    padding: $padding $padding ($padding + $hiddenOf) $padding;
    background: darken($colorHighlight, 10%);
    color: #fff;
    font-size: 30px;
    line-height: 1em;
    opacity: 0.5;
    transition: opacity $mouseEffectsDuration ease-out, bottom $mouseEffectsDuration ease-out;
    border-radius: $globalRoundness $globalRoundness 0px 0px;
    cursor: pointer;
    &:hover {
      opacity: 1;
      bottom: 0px;
    }
  }
}
</style>