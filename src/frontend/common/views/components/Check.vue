<template>
  <div class="check">
    <icon v-if="ok" name="check" class="animated tada" />
    <icon v-else name="close" class="animated bounceIn" />
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
  data(){
    return {};
  },
}
</script>

<style lang="scss">
@import "~ROOT/styles/config.scss";

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
