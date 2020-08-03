<template>
  <div ref="component" :class="'lazyimg'+(anim?' anim-'+anim:'')+(loaded?' loaded':' not-loaded')" :style="style">
    <img v-if="enteredViewport && !errored" ref="img" class="lazyimg-img" :src="src" :alt="alt">
    <img v-if="errored && placeholderUrl" class="lazyimg-img" :src="placeholderUrl">
    <overlay-spinner v-if="!loaded" />
    <right-click-protection v-if="rightClickProtected" />
  </div>
</template>

<script>
import IntersectionObserver from 'COMMON/utils/IntersectionObserver.js'

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
      errored: false,
      placeholderUrl: null,
      enteredViewport: false,
    }
  },
  computed: {
    ratioAsNumber: function() {
      if(typeof this.ratio === 'number'){
        return this.ratio;
      }
      switch(this.ratio){
        case 'landscape'  : return 9 / 16; break;
        case 'portrait'   : return 16 / 9; break;
      }
      return 1
    },
    style: function() {
      return !this.loaded || (this.errored && !this.placeholderUrl) ? 'padding-top: '+(Math.round((this.ratioAsNumber * 100) * 100) / 100)+'%' : '';
    },
  },
  mounted: function(){
    // setTimeout(function(){

    IntersectionObserver.observe(this.$refs.component, function(){
      this.enteredViewport = true;
      this.$nextTick(function(){
        if(typeof this.$refs.img != 'undefined'){
          if(this.$refs.img.complete){
            this.onImageLoadedHandler();
          } else {
            this.$refs.img.onload = this.onImageLoadedHandler.bind(this);
            this.$refs.img.onerror = this.onImageErrorHandler.bind(this);
          }
        }
      }.bind(this));
    }.bind(this));

    // }.bind(this), (Math.random() * 2000 + 1500));
  },
  methods: {
    onImageLoadedHandler: function(){
      this.loaded = true;
    },
    onImageErrorHandler: function(err){
      if(!this.errored){
        this.errored = true;

        // attempt to draw a placeholder image
        try {
          var bb = this.$refs.img.getBoundingClientRect();
          var w = Math.round(bb.width || 512);
          var h = Math.round(w * this.ratioAsNumber);
          var fontSize = Math.max(Math.round(h * 0.085), 13);
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          canvas.width = w;
          canvas.height = h;

          // background
          ctx.fillStyle = 'rgba(0,0,0,0.5)';
          ctx.fillRect(0, 0, w, h);

          // text
          ctx.textAlign = 'center';
          ctx.font = fontSize + 'px \'Oxygen\', sans-serif';
          ctx.fillStyle = '#eeeeee';
          ctx.fillText('Image not found', w * 0.5, (h * 0.5) + (fontSize * 0.4));

          this.placeholderUrl = canvas.toDataURL();
          this.loaded = true;
        } catch (e) {
          console.error(e);
        }
      }
    },
  },
}
</script>

<style lang="scss">
.lazyimg {
  position: relative;
  &.not-loaded {
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
