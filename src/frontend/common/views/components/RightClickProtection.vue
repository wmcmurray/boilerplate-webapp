<template>
  <div class="right-click-protection" v-on:contextmenu="onContextMenuHandler">
  </div>
</template>

<script>
/**
 * Displays a div on top of everything that stops right click events
 *
 * How to use :
 * <right-click-protection />
*/
export default {
  name: 'right-click-protection',
  data(){
    return {};
  },
  methods: {
    onContextMenuHandler(evt) {
      evt.preventDefault();
    },
  }
}
</script>

<style lang="scss">
@import "~ROOT/styles/config.scss";

.right-click-protection {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: transparent;
}
</style>
