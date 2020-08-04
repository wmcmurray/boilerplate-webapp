<template>
  <div v-if="currentActiveTab || loaded" :class="'tab-content'+(loaded?(currentActiveTab?'':' hidden'):'')">
    <slot></slot>
  </div>
</template>

<script>
import _indexOf from 'lodash/indexOf.js';

let COUNTER = 0;

/**
 * Displays a tab inside a tabs component
 *
 * How to use :
 * <tab title="My tab" />
*/
export default{
  props: {
    // the title shown in this tab
    title: {
      type: String,
      required: false,
      default: 'Tab',
    },
    // the route this tab represents (will update current url when this tab is selected)
    route: {
      type: [String, Object],
      required: false,
      default: null,
    },
  },
  data(){
    return {
      ident: ++COUNTER
    };
  },
  computed: {
    currentActiveTab(){
      return this.$parent.currentActiveTab == this.ident;
    },
    loaded(){
      return _indexOf(this.$parent.loadedTabsList, this.ident) !== -1;
    }
  },
  beforeDestroy(){
    this.$parent.deleteTab(this.ident);
  },
  created(){
    this.$parent.addTab(this.ident, this.title, this);
  }
}
</script>

<style lang="scss">
@import "~COMMON/styles/config";

.tabs {
  .tab-content {
    &.hidden {
      display: none;
    }
  }
}
</style>
