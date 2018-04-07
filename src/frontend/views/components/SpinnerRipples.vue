<template>
  <div class="spinner spinner-ripples">
    <div v-for="ripple in ripples" v-if="typeof ripple != 'undefined'" :key="ripple.id" class="ripple" :style="'animation-duration:'+ripple.lifetime+'s; width:'+ripple.size+'px; height:'+ripple.size+'px; margin-left:-'+(ripple.size * 0.5)+'px; margin-top:-'+(ripple.size * 0.5)+'px;'"></div>
  </div>
</template>

<script>
import _random from 'lodash/random'
import _reject from 'lodash/reject'

/**
 * Displays the new spinner featuring moving water ripples effect
*/
export default {
  name: 'spinner-ripples',
  props: {
    speed: {
      type: Number,
      default: 800,
    },
  },
  data: function(){
    return {
      counter: 0,
      ripples: [],
    }
  },
  created: function(){
    this.makeRipple();
    this.interval = setInterval(function(){ this.makeRipple(); }.bind(this), this.speed);
  },
  methods: {
    /**
     * Create and display a new ripple
     */
    makeRipple: function() {
      var id = ++this.counter;
      var lifetime = (this.speed / 1000) * 3.5;
      var size = 10;

      this.ripples.push({
        id        : id,
        lifetime  : lifetime,
        size      : size,
        timeout   : setTimeout(function(id){
          this.removeRipple(id);
        }.bind(this, id), lifetime * 1000),
      });
    },

    /**
     * Remove an existing ripple from it's id
     */
    removeRipple: function(id){
      this.$set(this, 'ripples', _reject(this.ripples, {id: id}));
    },
  },
  beforeDestroy: function() {
    if(this.interval){
      clearInterval(this.interval);
    }
    for(var i in this.ripples){
      if(this.ripples[i].timeout){
        clearTimeout(this.ripples[i].timeout);
      }
    }
  },
}
</script>

<style lang="scss">
@import "~ROOT/styles/config";
@import "~ROOT/styles/utils";

.spinner-ripples {
  $maxScale: 5;
  // $minSize: 5px;

  position: relative;

  .ripple {
    @include center;
    opacity: 0;
    // width: $minSize;
    // height: $minSize;
    border-radius: 50%;
    border: 2px solid $colorHighlight;
    animation-timing-function: ease-out;
    animation-name: ripple;
    animation-iteration-count: 1;
  }

  @keyframes ripple {
    0% {
      transform: scale(1);
      opacity: 0;
    }
    10% {
      opacity: 0.75;
    }
    60% {
      opacity: 0;
    }
    100% {
      transform: scale($maxScale);
      opacity: 0;
    }
  }
}
</style>
