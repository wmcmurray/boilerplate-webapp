<template>
  <div :class="'progress-bar'+(small?' small':'')" :title="small?displayedInfos:''">
    <div class="current-bar" :style="'width:'+perct+'%'"></div>
    <div class="infos">{{displayedInfos}}</div>
  </div>
</template>

<script>
export default {
  name: 'progress-bar',
  props: {
    from: {
      type: Number,
      default: 0
    },
    to: {
      type: Number,
      default: 100
    },
    current: {
      type: Number,
      default: 25
    },
    infos: {
      type: String,
      default: null
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    perct: function(){
      if(this.current == 0) return 0;
      return (this.current * 100) / (this.to - this.from);
    },
    displayedInfos: function(){
      return this.infos || (Math.round(this.current) + ' / ' + Math.round(this.to))
    }
  },
  data: function(){
    return {}
  }
}
</script>

<style lang="scss">
@import "webapp/frontend/styles/config";

.progress-bar {
  $color: lighten($colorTertiary, 20%);
  $bg: darken(mix(rgba($colorPrimary, 0.5), $color), 10%);
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
    color: $colorPrimary;
    text-align: center;
    line-height: $height;
    font-size: $height * 0.45;
  }

  .current-bar {
    position: relative;
    height: inherit;
    border-radius: $roundness 0px 0px $roundness;
    background-color: $color;
    border-top: 1px solid lighten($color, 10%);
    border-bottom: 1px solid darken($color, 10%);
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
