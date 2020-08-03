<template>
  <div class="spinner spinner-ripples">
    <div v-for="i in count" class="ripple" :style="'animation-duration:'+animationDuration+'s; animation-delay:'+(animationDelay * (i - 1))+'s;'" />
  </div>
</template>

<script>
import _round from 'lodash/round.js'

/**
 * Displays the new spinner featuring moving water ripples effect
*/
export default {
  name: 'spinner-ripples',
  props: {
    /**
     * The number of ripples displayed
     */
    count: {
      type: Number,
      default: 3,
    },
    /**
     * The speed at which each ripples moves (in milliseconds)
     */
    speed: {
      type: Number,
      default: 1350,
    },
  },
  data: function(){
    return {
    }
  },
  computed: {
    animationDuration: function() {
      return _round(this.speed / 1000, 4);
    },
    animationDelay: function() {
      return _round(this.animationDuration / this.count, 4);
    },
  },
}
</script>

<style lang="scss">
@import "~COMMON/styles/config";
@import "~COMMON/styles/utils";

.spinner-ripples {
  $thickness: 10px;
  $initialSize: 50px;
  $initialScale: 0.2;
  $finalScale: 1;

  position: relative;

  .ripple {
    @include center;
    opacity: 0;
    width: $initialSize;
    height: $initialSize;
    margin-left: ($initialSize + $thickness + $thickness) * -0.5;
    margin-top: ($initialSize + $thickness + $thickness) * -0.5;
    border-radius: 50%;
    border: $thickness solid $colorHighlight;
    animation-timing-function: ease-out;
    animation-name: ripple;
    animation-iteration-count: infinite;
  }

  @keyframes ripple {
    0% {
      transform: scale($initialScale);
      opacity: 0;
    }
    10% {
      opacity: 0.75;
    }
    60% {
      opacity: 0;
    }
    100% {
      transform: scale($finalScale);
      opacity: 0;
    }
  }
}
</style>
