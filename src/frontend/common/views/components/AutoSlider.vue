<template>
  <div class="auto-slider">
    <div class="items-container" :style="'width:'+(items.length * amountShownPerct)+'%; animation-duration:'+(items.length * secondsPerItem)+'s;'">

      <div class="items-list">
        <div v-for="item in items" class="single-item" :style="'width:'+amountShownPerct+'%'">
          <slot v-bind:item="item">
            <img :src="item" alt="" />
          </slot>
        </div>
      </div>

      <div class="items-list fake-items" :style="'width:'+boundingWidth+'px'">
        <div v-if="i < amountShown" v-for="item,i in items" class="single-item" :style="'width:'+amountShownPerct+'%'">
          <slot v-bind:item="item">
            <img :src="item" alt="" />
          </slot>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import _round from 'lodash/round.js'
import SizeAwarenessMixin from 'COMMON/mixins/SizeAwareness.js'

/**
 * Displays an horizontal slider in which there is a bunch of stuff scrolling automatically
 */
export default {
  name: 'auto-slider',
  mixins: [
    SizeAwarenessMixin,
  ],
  props: {

    // array of items to show in the slider
    items: {
      type: Array,
    },

    // how many items shown simultaneously (on large screens, will be reduces on smaller screens)
    itemsShownCount: {
      type: Number,
      default: 5,
    },

    // how many seconds it take per items
    secondsPerItem: {
      type: Number,
      default: 8,
    },

  },
  computed: {
    amountShown() {
      const maxCount = Math.max(4, this.itemsShownCount);
      if(this.boundingWidth <= 468){
        return maxCount - 3;
      }
      if(this.boundingWidth <= 1024){
        return maxCount - 2;
      }
      if(this.boundingWidth <= 1280){
        return maxCount - 1;
      }
      return maxCount;
    },
    amountShownPerct(){
      return _round(100 / this.amountShown, 3);
    },
  },
}
</script>

<style lang="scss">
@import "~ROOT/styles/config.scss";
@import "~COMMON/styles/utils.scss";

.auto-slider {
  @include disable-select;
  // pointer-events: none;
  // overflow: hidden;

  .items-list {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .single-item {
      padding: 0px ($globalPadding * 0.75);
      box-sizing: border-box;
      text-align: center;

      > * {
        width: auto;
        height: auto;
        max-width: 100%;
        // max-height: 100px;
        // filter: grayscale(1);
        // transform: scale(1);
        // transition: filter $mouseEffectsDuration ease-out, transform $mouseEffectsDuration ease-out;

        // &:hover {
        //   filter: grayscale(0);
        //   transform: scale(1.1);
        // }
      }
    }
  }

  .items-container {
    position: relative;
    animation-name: slideritems;
    animation-duration: 5s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;

    .fake-items {
      position: absolute;
      top: 0px;
      left: 100%;
      height: 100%;
    }
  }

  @keyframes slideritems {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
}
</style>
