<template>
  <div id="app" :class="'mainmenu-mobile-'+(mainMenuOpened?'opened':'closed')">
    <template v-if="ready">
      <div id="app-content">
        <header id="header">
          <router-link :to="{name:'home'}" class="logo" exact>{{ about.website.name }}<sub>v{{ appVersion }}</sub></router-link>
        </header>

        <nav id="mainmenu-desktop">
          <ul class="inline text-center">
            <template v-for="link, i in mainMenuLinks">
              <li v-if="i !== 0" class="sep">·</li>
              <menu-item :link="link" />
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
      </div>

      <transition name="fade">
        <div v-if="mainMenuOpened" id="mainmenu-mobile-overlay" @click="closeMainMenu()"></div>
      </transition>
      <nav id="mainmenu-mobile">
        <ul @click="closeMainMenu()">
          <menu-item
            v-for="link, i in mainMenuLinks"
            :key="link.href || link.route.name"
            :link="link"
          />
        </ul>
      </nav>
      <div id="mainmenu-mobile-btn" @click="toggleMainMenu()">
        <icon v-if="!mainMenuOpened" name="menu" />
        <icon v-if="mainMenuOpened" name="close" />
      </div>

      <scroll-to-top-btn v-if="!mainMenuOpened" />
      <vue-snotify class="snotify-container" />
    </template>
    <template v-else>
      <overlay-spinner :quickExit="true"/>
    </template>
  </div>
</template>

<script>
import _filter from 'lodash/filter.js'
// import dayjs from 'dayjs'
import { mapGetters, mapActions } from 'vuex'
import Mediator from 'ROOT/mediator.js'
import WindowFocusMixin from 'COMMON/mixins/WindowFocus.js'
import WindowResizeMixin from 'COMMON/mixins/WindowResize.js'
import WindowScrollMixin from 'COMMON/mixins/WindowScroll.js'
import ScrollToTopBtn from 'COMMON/views/components/ScrollToTopBtn.vue'
import MenuItem from 'COMMON/views/components/MenuItem.vue'

export default {
  name: 'app',
  mixins: [
    WindowFocusMixin,
    WindowResizeMixin,
    WindowScrollMixin,
  ],
  components: {
    ScrollToTopBtn,
    MenuItem,
  },
  data(){
    return {
      ready: false,
      about: JS_VARS.about,
      appVersion: JS_VARS.app_version,
    };
  },
  computed: {
    ...mapGetters([
      'mainMenuOpened',
    ]),
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
    ...mapActions([
      'closeMainMenu',
      'toggleMainMenu',
    ]),
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
    // dayjs.locale('en');

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
@import "~ROOT/styles/config.scss";
@import "~COMMON/styles/utils.scss";
@import "~COMMON/styles/easings.scss";
@import "~COMMON/styles/transitions.scss";
@import "~COMMON/styles/classes.scss";
@import "~ROOT/styles/base.scss";
@import "~ROOT/styles/forms.scss";

#app {
  $mainMenuMobileTransition: 0.35s $easeOutQuint;
  $mainMenuMobileTransitionPerspective: 0.2;
  $mainMenuMobileSide: right; // left | right
  $mainMenuMobileMaxWidth: 400px;
  $mainMenuMobileZIndex: 99999;
  $mainMenuMobileStartAt: $sm;
  $mainMenuMobileIconSize: 40px;

  overflow: hidden;
  padding-top: 0px;

  @media (max-width: $mainMenuMobileStartAt - 1px){
    $mainMenuMobileHeight: 72px;

    padding-top: $mainMenuMobileHeight;

    .snotify-container .snotify {
      transform: translateY($mainMenuMobileHeight);
    }
  }

  #app-content, #header {
    transition: $mainMenuMobileSide $mainMenuMobileTransition;
  }

  #app-content {
    position: relative;
  }

  #header {
    padding: $globalPadding;
    box-sizing: border-box;
    text-align: center;

    > .logo {
      $color: lighten($colorHighlight, 5%);
      $gradientStart: 15%;
      $gradientSpeed: 5%;

      $gradient1: $gradientStart;
      $gradient2: ($gradientStart + ($gradientSpeed * 1));
      $gradient3: ($gradientStart + ($gradientSpeed * 2));

      white-space: nowrap;
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

    @media (max-width: $mainMenuMobileStartAt - 1px){
      position: fixed;
      z-index: $mainMenuMobileZIndex - 2;
      top: 0px;
      width: 100%;
      padding-right: $mainMenuMobileIconSize + ($globalPadding * 2);
      background-color: rgba($colorText, 0.9);
      text-align: left;
      box-shadow: 0px 1px 2px rgba(black, 0.1);
      backdrop-filter: blur(10px);
    }
  }

  #mainmenu-desktop {
    margin-bottom: $globalSpacing;
    .sep {
      padding: 0px 3px;
      vertical-align: middle;
      font-size: 2em;
      color: $colorHighlight;
    }
    @media (max-width: $mainMenuMobileStartAt - 1px){
      display: none;
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

  #mainmenu-mobile-overlay {
    @include full-fixed;
    z-index: $mainMenuMobileZIndex - 1;
    background-color: $colorOverlay;

    &.fade-leave-active {
      pointer-events: none;
    }
  }

  #mainmenu-mobile-btn {
    @include disable-select;
    @include clickable;
    display: none;
    position: fixed;
    z-index: $mainMenuMobileZIndex + 1;
    top: $globalPadding - 3px;
    right: $globalPadding;
    font-size: 0px;
    line-height: 0px;

    svg {
      height: $mainMenuMobileIconSize;
      width: $mainMenuMobileIconSize;
      color: #fff;
    }

    @media (max-width: $mainMenuMobileStartAt - 1px){
      display: block;
    }
  }

  #mainmenu-mobile {
    @if $mainMenuMobileSide == 'right' {
      right: 0%;
    } @else {
      left: 0%;
    }

    @include disable-select;
    position: fixed;
    z-index: $mainMenuMobileZIndex;
    top: 0px;
    width: 100% - (100% * $mainMenuMobileTransitionPerspective);
    max-width: $mainMenuMobileMaxWidth;
    height: 100%;
    padding: $globalPadding;
    box-sizing: border-box;
    background-color: lighten($colorBackground, 10%);
    overflow-y: auto;
    transition: $mainMenuMobileSide $mainMenuMobileTransition;
    box-shadow: -5px 0px 25px rgba(black, 0.1);

    > ul {
      > li {
        a {
          display: block;
          padding: $globalPadding * 0.5 0px;
          font-size: 22px;
        }
      }
    }
  }

  &.mainmenu-mobile-opened {
    #app-content, #header {
      $mediaQueryValue: $mainMenuMobileMaxWidth * (1 + $mainMenuMobileTransitionPerspective); // its about right
      $decal: 100% * $mainMenuMobileTransitionPerspective;

      pointer-events: none;

      @if $mainMenuMobileSide == 'right' {
        right: $decal;
      } @else {
        left: $decal;
      }
      @media (min-width: $mediaQueryValue) {
        right: $mainMenuMobileMaxWidth * $mainMenuMobileTransitionPerspective !important;
      }
    }

    @if $mainMenuMobileSide == 'right' {
      #mainmenu-mobile-btn {
        svg {
          color: $colorText;
        }
      }
    }
  }

  &.mainmenu-mobile-closed {
    #app-content, #header {
      @if $mainMenuMobileSide == 'right' {
        right: 0%;
      } @else {
        left: 0%;
      }
    }
    #mainmenu-mobile {
      @if $mainMenuMobileSide == 'right' {
        right: -100%;
      } @else {
        left: -100%;
      }
    }
  }
}
</style>
