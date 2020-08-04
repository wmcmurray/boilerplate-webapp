<template>
  <div class="spinner spinner-classic animated infinite rubberBand">
    <three-dots dot="&middot"/>
  </div>
</template>

<script>
/**
 * Displays the old classic spinner
*/
export default {
  name: 'spinner-classic',
  data(){
    return {};
  },
}
</script>

<style lang="scss">
@import "~COMMON/styles/config";

.spinner-classic {
  $size: 32px;
  $color: lighten($colorHighlight, 15%);
  // $glowColor: rgba(black, 0.15);
  // $glowSize: 0px;

  border-radius: 50%;
  width: $size;
  height: $size;
  border: 2px solid $color;
  font-size: $size * 0.75;
  text-align: center;
  line-height: $size;
  color: $color;
  // box-shadow: 3px 3px $glowSize $glowColor, inset 3px 3px $glowSize $glowColor;
  // background-color: rgba($color, 0.25);
}
</style>
