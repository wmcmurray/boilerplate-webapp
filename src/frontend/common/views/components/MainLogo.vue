<template>
  <router-link :to="{name:'home'}" class="main-logo" exact>{{ appName }}<sub>v{{ appVersion }}</sub></router-link>
</template>

<script>
/**
 * Displays the main logo of this app
 *
 * How to use :
 * <main-logo />
*/
export default {
  name: 'main-logo',
  data(){
    return {
      appName: JS_VARS.about.website.name,
      appVersion: JS_VARS.app_version,
    };
  },
}
</script>

<style lang="scss">
@import "~ROOT/styles/config.scss";
@import "~COMMON/styles/utils.scss";

.main-logo {
  $color: lighten($colorHighlight, 5%);
  $gradientStart: 15%;
  $gradientSpeed: 5%;

  $gradient1: $gradientStart;
  $gradient2: ($gradientStart + ($gradientSpeed * 1));
  $gradient3: ($gradientStart + ($gradientSpeed * 2));

  white-space: nowrap;
  font-size: 60px;
  line-height: $globalLineHeightTitle;
  font-weight: bold;
  text-shadow: 0px 1px 0px darken($color, $gradient1), 0px 2px 0px darken($color, $gradient2), 0px 3px 0px darken($color, $gradient3), 0px 7px 0px rgba(black, 0.1);
  color: $color;
  transition: all $mouseEffectsDuration ease-out;
  @include clickable;

  sub {
    display: inline-block;
    width: 0px;
    height: 0px;
    font-weight: normal;
    font-size: 10px;
    opacity: 0.5;
    color: $colorText;
    text-shadow: none;
  }

  @media (max-width: $md - 1px){
    font-size: 50px;
  }

  @media (max-width: $mainMenuMobileStartAt - 1px){
    font-size: 30px;
    line-height: 1em;
    white-space: normal;
    color: #fff;
    text-shadow: 0px 1px 0px darken($color, 25%);
    transition: none;

    sub {
      display: none;
    }
  }

  @media (min-width: $mainMenuMobileStartAt){
    &:hover {
      $color: lighten($color, $mouseEffectsLightnessIncrease);
      color: $color;
      text-shadow: 0px 1px 0px darken($color, $gradient1), 0px 2px 0px darken($color, $gradient2), 0px 3px 0px darken($color, $gradient3), 0px 7px 0px rgba(black, 0.1);
    }
  }
}
</style>
