<template>
  <div class="check">
    <svg v-if="ok" class="icon icon-check animated tada"><use xlink:href="#icon-check"></use></svg>
    <svg v-else class="icon icon-close animated bounceIn"><use xlink:href="#icon-close"></use></svg>
  </div>
</template>

<script>
export default {
  name: 'check',
  props: {
    ok: Boolean
  },
  data: function(){
    return {}
  }
}
</script>

<style lang="scss">
@import "webapp/frontend/styles/config";

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
