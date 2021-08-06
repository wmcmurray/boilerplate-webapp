<template>
  <div :class="'hero-picture content-align-'+alignContent" :style="backgroundImage ? 'background-image: url('+backgroundImage+');' : ''">
    <div v-if="shadowGradient" class="shadow-gradient" />
    <div class="inner-limit">
      <div class="inner-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Displays content inside a box that emphasise a large picture in the background
 *
 * How to use :
 * <hero-picture backgroundImage="STRING" alignContent="left" />
*/
export default {
  name: 'hero-picture',
  props: {

    // url of the background image
    backgroundImage: {
      type: String,
      default: '',
    },

    // where content is aligned ( left | center | right)
    alignContent: {
      type: String,
      default: 'left',
    },

    // if a shadow gradient is added (to add contrast to the text)
    shadowGradient: {
      type: Boolean,
      default: true,
    },

  },
  data(){
    return {};
  },
}
</script>

<style lang="scss">
@import "~ROOT/styles/config.scss";
@import "~COMMON/styles/utils.scss";

.hero-picture {
  $shadowGradientColor: black;
  $shadowGradientOpacity: 0.6;
  $smallVersionSize: $sm;

  position: relative;
  padding: $globalSpacing;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  @media (max-width: $smallVersionSize - 1px){
    padding: ($globalPadding * 2) $globalPadding;
  }

  > .shadow-gradient {
    @include full-absolute;
  }

  > .inner-limit {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 75vh;
    max-width: $maxWidth * 1.25;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: $smallVersionSize - 1px){
      min-height: initial;
    }

    > .inner-content {
      max-width: $maxWidth * 0.5;
      font-size: 1.25em;
      line-height: $globalLineHeight;
      text-shadow: 0px 1px 0px rgba(black, 0.2);
    }
  }

  &.content-align-left {
    background-position: right center;

    > .shadow-gradient {
      background-image: linear-gradient(75deg, rgba($shadowGradientColor, $shadowGradientOpacity) 50%, rgba($shadowGradientColor, 0));
    }

    > .inner-limit {
      justify-content: flex-start;
    }
  }

  &.content-align-center {
    background-position: center;

    > .shadow-gradient {
      background-image: linear-gradient(90deg, rgba($shadowGradientColor, 0), rgba($shadowGradientColor, $shadowGradientOpacity) 30% 70%, rgba($shadowGradientColor, 0));
    }

    > .inner-limit {
      justify-content: center;
    }
  }

  &.content-align-right {
    background-position: left center;

    > .shadow-gradient {
      background-image: linear-gradient(-75deg, rgba($shadowGradientColor, $shadowGradientOpacity) 50%, rgba($shadowGradientColor, 0));
    }

    > .inner-limit {
      justify-content: flex-end;
    }
  }
}
</style>
