<template>
  <div :class="'progress-bar'+(small?' small':'')" :title="small?displayedInfos:''">
    <div class="current-bar" :style="'width:'+perct+'%'"></div>
    <div class="infos">{{displayedInfos}}</div>
  </div>
</template>

<script>
/**
 * Displays a progress bar
 *
 * How to use :
 * <progress-bar :from="0" :to="5" :current="4" />
*/
export default {
  name: 'progress-bar',
  props: {
    // values starts from
    from: {
      type: Number,
      default: 0,
    },
    // maximum value
    to: {
      type: Number,
      default: 100,
    },
    // current value of the progress bar
    current: {
      type: Number,
      default: 25,
    },
    // text displayed on top of the progress bar
    infos: {
      type: String,
      default: null,
    },
    // if the bar should be thin (small height)
    small: {
      type: Boolean,
      default: false,
    },
  },
  data: function(){
    return {}
  },
  computed: {
    perct: function(){
      if(this.current == 0) return 0;
      return (this.current * 100) / (this.to - this.from);
    },
    displayedInfos: function(){
      return this.infos || (Math.round(this.current) + ' / ' + Math.round(this.to))
    },
  },
}
</script>

<style lang="scss">
@import "~COMMON/styles/config";

.progress-bar {
  $color: lighten($colorHighlight, 10%);
  $bg: darken(mix(rgba($colorBackground, 0.5), $color), 10%);
  $height: 25px;
  $heightSmall: 6px;
  $roundness: $globalRoundness;

  position: relative;
  height: $height;
  border-radius: $roundness;
  overflow: hidden;
  background: $bg;
  box-shadow: 0px 4px 0px rgba(black, 0.25) inset;

  .infos {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    color: $colorText;
    text-align: center;
    line-height: $height;
    font-size: $height * 0.45;
  }

  .current-bar {
    $currentBarColor: lighten($color, 10%);

    position: relative;
    height: inherit;
    border-radius: $roundness 0px 0px $roundness;
    background-color: $currentBarColor;
    border-top: 1px solid lighten($currentBarColor, 10%);
    border-bottom: 1px solid darken($currentBarColor, 10%);
  }

  &.small {
    height: $heightSmall;
    background-color: rgba(black, 0.2);
    box-shadow: 0px 1px 0px rgba(black, 0.25) inset;

    .infos {
      line-height: $heightSmall;
      font-size: 0px;
    }
  }
}
</style>
