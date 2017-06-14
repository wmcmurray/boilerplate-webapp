<template>
  <transition :name="quickExit?'fadein':'fade'" appear>
    <div class="loader">
      <div class="loader-center">
        <div class="loader-center-spinner animated infinite rubberBand">
          <three-dots dot="&middot"></three-dots>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'loader',
  props: {
    quickExit: Boolean
  },
  data: function(){
    return {}
  }
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
