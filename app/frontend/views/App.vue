<template>
  <div id="app">
    <svgdefs></svgdefs>
    <template v-if="ready">
      <header id="header">
        <router-link :to="{name:'home'}" tag="span" class="logo" exact>{{ config.about.website.name }}</router-link>
      </header>

      <nav id="mainmenu">
        <ul class="inline text-center">
          <li><router-link :to="{name:'home'}" exact>Home</router-link></li>
          <li class="sep">·</li>
          <li><router-link :to="{name:'components'}" exact>Components</router-link></li>
          <li class="sep">·</li>
          <li><router-link :to="{name:'api'}" exact>API</router-link></li>
        </ul>
      </nav>

      <main id="main">
        <transition name="fadein" mode="out-in">
          <router-view/>
        </transition>
      </main>

      <footer id="footer">
        <p v-html="copyrightNotice"></p>
      </footer>
    </template>
    <template v-else>
      <loader :quickExit="true"/>
    </template>
  </div>
</template>

<script>
import moment from 'moment'
import config from 'ROOT/models/config.js'
import SvgDefsComponent from 'ROOT/views/SvgDefs.vue'

export default {
  name: 'app',
  components: {
    svgdefs: SvgDefsComponent
  },
  data: function(){
    return {
      JS_VARS: JS_VARS,
      ready: false,
      config: config.get(),
    }
  },
  computed: {
    copyrightNotice: function(){
      if(this.config){
        var currentYear = (new Date()).getFullYear();
        var launched = this.config.about.website.launched;
        var author = this.config.about.author.name;
        if(this.config.about.author.website){
          author = '<a href="'+this.config.about.author.website+'">'+author+'</a>';
        }
        return '&copy; ' + launched + (currentYear > launched ? '-'+currentYear : '') + ' '+author+' - All rights reserved';
      } else {
        return '';
      }
    }
  },
  created: function(){
    // define default locale
    moment.locale('en-gb');

    // the app is ready
    this.ready = true;
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Oxygen:300,400,700|Play');

@import "~ROOT/styles/config";
@import "~ROOT/styles/utils";
@import "~ROOT/styles/base";
@import "~ROOT/styles/grid";
@import "~ROOT/styles/classes";
@import "~ROOT/styles/animate";
@import "~ROOT/styles/transitions";

/**
 *  App style
 */
#app {
  #header {
    padding: $globalPadding;
    text-align: center;

    > .logo {
      $color: lighten($colorHighlight, 10%);
      $gradientStart: 15%;
      $gradientSpeed: 5%;

      $gradient1: $gradientStart;
      $gradient2: ($gradientStart + ($gradientSpeed * 1));
      $gradient3: ($gradientStart + ($gradientSpeed * 2));

      white-space: nowrap;
      font-family: 'Play', sans-serif;
      font-size: 60px;
      line-height: 1.5em;
      font-weight: bold;
      text-shadow: 0px 1px 0px darken($color, $gradient1), 0px 2px 0px darken($color, $gradient2), 0px 3px 0px darken($color, $gradient3), 0px 7px 0px rgba(black, 0.1);
      color: $color;
      transition: all $mouseEffectsDuration ease-out;
      @include clickable;

      &:hover {
        $color: lighten($color, $mouseEffectsLightnessIncrease);
        color: $color;
        text-shadow: 0px 1px 0px darken($color, $gradient1), 0px 2px 0px darken($color, $gradient2), 0px 3px 0px darken($color, $gradient3), 0px 7px 0px rgba(black, 0.1);
      }
    }
  }
  #mainmenu {
    margin-bottom: $globalSpacing;
    .sep {
      padding: 0px 3px;
      vertical-align: middle;
      font-size: 2em;
      color: $colorHighlight;
    }
  }
  #main {
    position: relative;
    min-height: 50vh;
    padding: $globalPadding 0px;
  }
  #footer {
    padding: $globalPadding;
    text-align: center;
    font-size: 12px;
    color: rgba($colorText, 0.5);

    > p {
      margin: 0.5em;
    }
  }
}
</style>
