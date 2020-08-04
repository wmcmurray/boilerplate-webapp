<template>
  <span class="three-dots" v-html="dotsSanitized.join('')"></span>
</template>

<script>
/**
 * Display an accumulation of dots appended with an interval
 * (usually used to show that something is loading)
 *
 * How to use :
 * <three-dots />
 * <three-dots dot="." :dotsMax="5" :dotsInterval="1000" :fillVoid="true" />
*/
export default {
  name: 'three-dots',
  props: {
    // the string that will be appended multiple times
    dot: {
      type: String,
      default: '.',
    },
    // the maximum of dots appended before restart
    dotsMax: {
      type: Number,
      default: 3,
    },
    // time between each append (in milliseconds)
    dotsInterval: {
      type: Number,
      default: 250,
    },
    // if true, there will be invisible dots where there should not be a dot
    // just so the total width of the component stays the same no matter what
    fillVoid: {
        type: Boolean,
        default: false,
    },
  },
  data(){
    return {
      dots: [],
    };
  },
  computed: {
    dotsSanitized() {
      if(this.fillVoid){
        const dots = [].concat(this.dots);

        while (dots.length < this.dotsMax) {
          dots.push('<span class="filled-void">'+this.dot+'</span>');
        }

        return dots;
      }
      return this.dots;
    },
  },
  created() {
    this.interval = setInterval(() => {
      if(this.dots.length >= this.dotsMax){
        this.dots = [];
      } else {
        this.dots.push(this.dot);
      }
    }, this.dotsInterval)
  },
  destroyed(){
    if(this.interval){
      clearInterval(this.interval);
    }
  },
}
</script>

<style lang="scss">
.three-dots {
  > span {
    display: inline-block;
  }
  .filled-void {
    visibility: hidden;
  }
}
</style>
