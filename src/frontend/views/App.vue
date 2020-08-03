<template>
  <div id="app">
    <template v-if="ready">
      <header id="header">
        <router-link :to="{name:'home'}" class="logo" exact>{{ about.website.name }}<sub>v{{ appVersion }}</sub></router-link>
      </header>

      <nav id="mainmenu">
        <ul class="inline text-center">
          <li><router-link :to="{name:'home'}" exact>Home</router-link></li>
          <li class="sep">·</li>
          <li><router-link :to="{name:'components'}" exact>Components</router-link></li>
          <template v-if="apiPage">
            <li class="sep">·</li>
            <li><router-link :to="{name:'api'}" exact>API</router-link></li>
          </template>
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

      <scroll-to-top-btn />
      <vue-snotify />
    </template>
    <template v-else>
      <overlay-spinner :quickExit="true"/>
    </template>
  </div>
</template>

<script>
import moment from 'moment'
import store from 'ROOT/store.js'
import Mediator from 'ROOT/mediator.js'
import ScrollToTopBtn from 'COMMON/views/components/ScrollToTopBtn.vue'

export default {
  name: 'app',
  components: {
    scrollToTopBtn: ScrollToTopBtn,
  },
  data: function(){
    return {
      ready: false,
      about: JS_VARS.about,
      appVersion: JS_VARS.app_version,
      apiPage: JS_VARS.db_object_modeling ? true : false,
    }
  },
  computed: {
    copyrightNotice: function(){
      var currentYear = (new Date()).getFullYear();
      var launched = this.about.website.launched;
      var author = this.about.author.name;
      if(this.about.author.website){
        author = '<a href="'+this.about.author.website+'" target="_blank" rel="noopener">'+author+'</a>';
      }
      return '&copy; ' + launched + (currentYear > launched ? '-'+currentYear : '') + ' '+author+' - All rights reserved';
    }
  },
  created: function(){
    // define default locale
    moment.locale('en-gb');

    // the app is ready
    this.ready = true;
  },
  watch: {
    ready: function(nv, ov){
      if(!ov && nv){
        Mediator.emit('APP_READY');
      }
    },
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Oxygen:300,400,700|Play');
@import "~vue-snotify/styles/material";

@import "~COMMON/styles/config";
@import "~COMMON/styles/utils";
@import "~COMMON/styles/animate";
@import "~COMMON/styles/easings";
@import "~COMMON/styles/grid";
@import "~COMMON/styles/transitions";
@import "~COMMON/styles/classes";
@import "~ROOT/styles/base";

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
      line-height: $globalLineHeight;
      font-weight: bold;
      text-shadow: 0px 1px 0px darken($color, $gradient1), 0px 2px 0px darken($color, $gradient2), 0px 3px 0px darken($color, $gradient3), 0px 7px 0px rgba(black, 0.1);
      color: $color;
      transition: all $mouseEffectsDuration ease-out;
      @include clickable;

      sub {
        display: inline-block;
        width: 0px;
        font-weight: normal;
        font-size: 10px;
        opacity: 0.5;
        color: $colorText;
        text-shadow: none;
      }

      &:hover {
        $color: lighten($color, $mouseEffectsLightnessIncrease);
        color: $color;
        text-shadow: 0px 1px 0px darken($color, $gradient1), 0px 2px 0px darken($color, $gradient2), 0px 3px 0px darken($color, $gradient3), 0px 7px 0px rgba(black, 0.1);
      }

      @media (max-width: $md){
        font-size: 50px;
      }
      @media (max-width: $sm){
        font-size: 40px;
      }
      @media (max-width: $xs){
        font-size: 30px;
        white-space: normal;
        text-shadow: none;
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
    font-size: 13px;
    color: rgba($colorText, 0.75);

    > p {
      margin: 0.5em;
    }
  }
}
</style>
