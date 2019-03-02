<template>
  <div ref="component" :class="'lazyimg'+(anim?' anim-'+anim:'')+(loaded?' loaded':' not-loaded')+(ratio && typeof ratio === 'string'? ' ratio-'+ratio:'')" :style="style">
    <img v-if="enteredViewport" ref="img" class="lazyimg-img" :src="src" :alt="alt">
    <div v-if="rightClickProtected" class="right-click-protected" v-on:contextmenu="onContextMenuHandler"></div>
    <overlay-spinner v-if="!loaded" />
  </div>
</template>

<script>
import IntersectionObserver from 'ROOT/utils/IntersectionObserver.js'

/**
 * Wrapper around an image to show a spinner before it's loaded
 *
 * How to use :
 * <lazyimg src="/images/sample.jpg" alt="" />
*/
export default {
  name: 'lazyimg',
  props: {
    // the image's src url
    src: {
      type: String
    },
    // the image's alt
    alt: {
      type: String,
      default: '',
    },
    // the name of the intro animation (fade | blur)
    anim: {
      type: [Boolean, String],
      default: 'fade'
    },
    // the ratio of the image (ratio = height / width) may also be string values like : landscape, portrait, square
    ratio: {
      type: [String, Number],
      default: 'landscape'
    },
    // if we want the prevent user to save the image (not bullet proof, but should stop unaware users)
    rightClickProtected: {
      type: Boolean,
      default: false,
    },
  },
  data: function(){
    return {
      loaded: false,
      enteredViewport: false,
    }
  },
  computed: {
    style: function() {
      if(!this.loaded && typeof this.ratio === 'number'){
        return 'padding-top: '+(Math.round((this.ratio * 100) * 100) / 100)+'%';
      }
      return '';
    },
  },
  mounted: function(){
    // setTimeout(function(){

    IntersectionObserver.observe(this.$refs.component, function(){
      this.enteredViewport = true;
      this.$nextTick(function(){
        if(typeof this.$refs.img != 'undefined'){
          if(this.$refs.img.complete){
            this.loaded = true;
          } else {
            this.$refs.img.onload = function(){
              this.loaded = true;
            }.bind(this);
          }
        }
      }.bind(this));
    }.bind(this));

    // }.bind(this), (Math.random() * 2000 + 1500));
  },
  methods: {
    onContextMenuHandler: function(evt) {
      evt.preventDefault();
    }
  },
}
</script>

<style lang="scss">
.lazyimg {
  position: relative;
  .right-click-protected {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
  &.not-loaded {
    &.ratio-landscape {
      padding-top: (9 / 16) * 100%;
    }
    &.ratio-portrait {
      padding-top: (16 / 9) * 100%;
    }
    &.ratio-square {
      padding-top: 100%;
    }
    .lazyimg-img {
      position: absolute;
      top: 0px;
      left: 0px;
    }
  }
  &.anim-fade {
    .lazyimg-img {
      opacity: 0;
      transition: opacity 0.35s ease-out!important;
    }
    &.loaded {
      .lazyimg-img {
        opacity: 1;
      }
    }
  }
  &.anim-blur {
    .lazyimg-img {
      opacity: 0;
      filter: blur(5px);
      transition: opacity 0.25s ease-in-out, filter 0.75s ease-out!important;
    }
    &.loaded {
      .lazyimg-img {
        opacity: 1;
        filter: blur(0px);
      }
    }
  }
}
</style>
