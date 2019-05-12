<template>
  <svg :class="'icon icon-'+name">
    <use :xlink:href="'/sprite.svg#icon-'+name"></use>
  </svg>
</template>

<script>
/**
 * Displays an icon comming from SvgDefs component
 *
 * How to use :
 * <icon name="my-icon-name" />
*/
export default {
  name: 'icon',
  props: {
    // the name of the icon
    name: {
      type: String,
      default: 'default',
    },
  },
  data: function(){
    return {}
  },
}
</script>

<style lang="scss">
.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
}
</style>
