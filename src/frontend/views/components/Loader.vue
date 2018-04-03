<template>
  <transition :name="quickExit?'fadein':'fade'" appear>
    <div class="loader" :style="overlayColor?'background-color:'+overlayColor+';':false">
      <div class="loader-center">
        <div class="loader-center-spinner animated infinite rubberBand">
          <three-dots dot="&middot"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
/**
 * Displays a semi-transparent overlay with a loading animation
 *
 * How to use :
 * <loader />
 * <loader :quickExit="true" overlayColor="#000" />
*/
export default {
  name: 'loader',
  props: {
    // if we want it to disapear with a fade or instantly
    quickExit: {
      type: Boolean,
      default: false,
    },
    // the color of the overlay
    overlayColor: {
      type: String,
      default: '',
    },
  },
  data: function(){
    return {}
  },
}
</script>

<style lang="scss">
@import "~ROOT/styles/config";
@import "~ROOT/styles/utils";

.loader {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(lighten(desaturate($colorBackground, 10%), 10%), 0.5);
  @include busy;
  @include disable-select;

  .loader-center {
    $size: 32px;
    $color: lighten($colorHighlight, 20%);
    $glowColor: rgba(black, 0.15);
    $glowSize: 0px;

    @include center;
    color: $color;
    font-size: 20px;
    text-align: center;
    line-height: $size;

    .loader-center-spinner {
      border-radius: 50%;
      width: $size;
      height: $size;
      border: 2px solid $color;
      box-shadow: 3px 3px $glowSize $glowColor, inset 3px 3px $glowSize $glowColor;
    }
  }
}
</style>

<style lang="scss">
@import "~ROOT/styles/config";

// use this if you want to contain the loader overlay in a div or something
.loader-container {
    position: relative;
    min-height: 150px;
    overflow: hidden;
}
</style>
