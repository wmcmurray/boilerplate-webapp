<template>
  <div id="app">
    <template v-if="ready">
      <header id="header">
        <router-link :to="{name:'home'}" class="logo" exact>{{ about.website.name }}<sub>v{{ appVersion }}</sub></router-link>
      </header>

      <nav id="mainmenu">
        <ul class="inline text-center">
          <template v-for="link, i in mainMenuLinks">
            <li v-if="i !== 0" class="sep">·</li>
            <li>
              <router-link v-if="link.route" :to="link.route" :exact="link.exact">{{ link.html }}</router-link>
              <a v-else :href="link.href" target="_blank">{{ link.html }}</a>
            </li>
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
import _filter from 'lodash/filter.js'
import moment from 'moment'
import store from 'ROOT/store.js'
import Mediator from 'ROOT/mediator.js'
import ScrollToTopBtn from 'COMMON/views/components/ScrollToTopBtn.vue'

export default {
  name: 'app',
  components: {
    ScrollToTopBtn,
  },
  data(){
    return {
      ready: false,
      about: JS_VARS.about,
      appVersion: JS_VARS.app_version,
    };
  },
  computed: {
    mainMenuLinks() {
      const links = [
        {
          route: {name:'home'},
          html: 'Home',
        },
        {
          route: {name:'components'},
          html: 'Components',
        },
        {
          route: {name:'api'},
          html: 'API',
          visible: JS_VARS.db_object_modeling ? true : false,
        },
        {
          href: 'https://github.com/wmcmurray/boilerplate-webapp',
          html: 'Github',
        },
      ];

      return this.sanitizeLinks(links);
    },
    copyrightNotice(){
      const currentYear = (new Date()).getFullYear();
      const launched = this.about.website.launched;
      let author = this.about.author.name;
      if(this.about.author.website){
        author = '<a href="'+this.about.author.website+'" target="_blank" rel="noopener">'+author+'</a>';
      }
      return '&copy; ' + launched + (currentYear > launched ? '-'+currentYear : '') + ' '+author+' - All rights reserved';
    },
  },
  methods: {
    sanitizeLinks(links) {
      for(let i in links){
        if(typeof links[i].visible === 'undefined') {
          links[i].visible = true;
        }
        if(typeof links[i].exact === 'undefined') {
          links[i].exact = true;
        }
      }
      return _filter(links, {visible: true});
    },
  },
  created(){
    // define default locale
    moment.locale('en-gb');

    // the app is ready
    this.ready = true;
  },
  watch: {
    ready(nv, ov){
      if(!ov && nv){
        Mediator.emit('APP_READY');
      }
    },
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Oxygen:300,400,700|Play');
@import "~vue-snotify/styles/material.css";

@import "~COMMON/styles/config.scss";
@import "~COMMON/styles/utils.scss";
@import "~COMMON/styles/animate.scss";
@import "~COMMON/styles/easings.scss";
@import "~COMMON/styles/grid.scss";
@import "~COMMON/styles/transitions.scss";
@import "~COMMON/styles/classes.scss";
@import "~ROOT/styles/base.scss";
@import "~ROOT/styles/forms.scss";

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
