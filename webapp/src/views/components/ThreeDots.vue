<template>
  <span class="three-dots" v-html="dots.join('')"></span>
</template>

<script>
export default {
  name: 'three-dots',
  props: {
    dot: {
      type: String,
      default: '.'
    },
    dotsMax: {
      type: Number,
      default: 3
    },
    dotsInterval: {
      type: Number,
      default: 250
    }
  },
  data () {
    return {
      dots: []
    }
  },
  created: function () {
    this.interval = setInterval(function () {
      if(this.dots.length >= this.dotsMax){
        this.dots = [];
      } else {
        this.dots.push(this.dot);
      }
    }.bind(this), this.dotsInterval)
  },
  destroyed: function(){
    if(this.interval){
      clearInterval(this.interval);
    }
  }
}
</script>

<style lang="scss">
.three-dots {
  > span {
    display: inline-block;
  }
}
</style>
