<template>
  <transition :name="quickExit?'fadein':'fade'" appear>
    <div class="overlay-spinner" :style="overlayColor?'background-color:'+overlayColor+';':false">
      <div class="overlay-spinner-center">
        <spinner />
      </div>
    </div>
  </transition>
</template>

<script>
/**
 * Displays a semi-transparent overlay with a spinner inside
 *
 * How to use :
 * <overlay-spinner />
 * <overlay-spinner :quickExit="true" overlayColor="#000" />
*/
export default {
  name: 'overlay-spinner',
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
  data(){
    return {};
  },
}
</script>

<style lang="scss">
@import "~ROOT/styles/config.scss";
@import "~COMMON/styles/utils.scss";

.overlay-spinner {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(lighten(desaturate($colorBackground, 10%), 10%), 0.5);
  @include busy;
  @include disable-select;

  .overlay-spinner-center {
    @include center;
  }
}
</style>

<style lang="scss">;
.spinner-container {
  position: relative;
  min-height: 150px;
  overflow: hidden;
}
</style>
