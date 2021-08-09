<template>
  <div id="app" :class="'mainmenu-mobile-'+(mainMenuOpened?'opened':'closed')">
    <template v-if="ready">
      <div id="app-content">
        <header id="header">
          <main-logo />
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
            <router-view />
          </transition>
        </main>

        <footer id="footer">
          <copyright-notice />
          <locale-switcher class="hidden-sm-down" />
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
        <locale-switcher class="bg-inverted" />
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
import { mapGetters, mapActions } from 'vuex'
import Mediator from 'ROOT/mediator.js'
import WindowFocusMixin from 'COMMON/mixins/WindowFocus.js'
import WindowResizeMixin from 'COMMON/mixins/WindowResize.js'
import WindowScrollMixin from 'COMMON/mixins/WindowScroll.js'
import ScrollToTopBtn from 'COMMON/views/components/ScrollToTopBtn.vue'
import LocaleSwitcher from 'COMMON/views/components/LocaleSwitcher.vue'
import MenuItem from 'COMMON/views/components/MenuItem.vue'
import MainLogo from 'COMMON/views/components/MainLogo.vue'
import CopyrightNotice from 'COMMON/views/components/CopyrightNotice.vue'

export default {
  name: 'app',
  mixins: [
    WindowFocusMixin,
    WindowResizeMixin,
    WindowScrollMixin,
  ],
  components: {
    ScrollToTopBtn,
    LocaleSwitcher,
    MenuItem,
    MainLogo,
    CopyrightNotice,
  },
  data(){
    return {
      ready: false,
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
    $color: rgba($colorText, 0.75);

    padding: $globalPadding;
    text-align: center;
    font-size: $globalMinimumFontSize;
    color: $color;

    > p {
      display: inline-block;
      margin: 0.5em;
    }

    .locale-switcher {
      border: 1px solid $color;
      border-radius: $globalRoundness;
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

    .locale-switcher {
      position: absolute;
      z-index: 999999;
      bottom: $globalPadding;
      left: $globalPadding;
      border-radius: $globalRoundness;
      overflow: hidden;

      > span {
        padding: $globalPadding * 0.5;
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
