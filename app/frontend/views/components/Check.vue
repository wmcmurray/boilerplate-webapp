<template>
  <div class="check">
    <svg v-if="ok" class="icon icon-check animated tada"><use xlink:href="#icon-check"></use></svg>
    <svg v-else class="icon icon-close animated bounceIn"><use xlink:href="#icon-close"></use></svg>
  </div>
</template>

<script>
/**
 * Displays a checkmark or an X icon with proper colors
 *
 * How to use :
 * <check :ok="false" />
 * <check :ok="true" />
*/
export default {
  name: 'check',
  props: {
    // if it's a green checkmark or a red cross
    ok: {
      type: Boolean,
      default: true,
    },
  },
  data: function(){
    return {}
  },
}
</script>

<style lang="scss">
@import "~ROOT/styles/config";

.check {
  display: inline-block;
  font-size: 40px;
  .icon {
    &.icon-check {
      color: $colorOk;
    }
    &.icon-close {
      color: $colorBad;
    }
  }
}
</style>
