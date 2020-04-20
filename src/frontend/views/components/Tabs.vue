<template>
  <div class="tabs full-width-menu" :id="id">

    <nav class="tabs-menu">
      <ul class="inline">
        <li :class="'tabs-menu-item '+(tab.component.loaded?' loaded':'')+(currentActiveTab == tab.ident ? ' active' : '')" v-for="tab in tabs" v-html="tab.component.title" @click.prevent="selectTab(tab, true)"></li>
      </ul>
    </nav>

    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import _indexOf from 'lodash/indexOf.js';

var TABS_INSTANCES_COUNTER = 0;

/**
 * Displays a bloc with tabs to toogle content
 *
 * How to use :
 * <tabs />
*/
export default {
  props:{
    // If we want all tabs to be preloaded (dom created) even if user never clicked on it
    preload: {
      type: Boolean,
      default: false,
    },
    // the tab index that should be active initially ( 0 - infinity)
    initialTabIndex: {
      type: Number,
      default: 0,
    },
  },
  data: function () {
    return {
      id: 'tabs-'+ ++TABS_INSTANCES_COUNTER,
      currentActiveTab: null,
      loadedTabsList: [],
      tabs: [],
    }
  },

  mounted() {
    if(this.currentActiveTab === null && this.tabs.length){
      if(this.initialTabIndex && typeof this.tabs[this.initialTabIndex] !== 'undefined') {
        this.currentActiveTab = this.tabs[this.initialTabIndex].ident;
      } else {
        this.currentActiveTab = this.tabs[0].ident;
      }
    }
  },

  methods: {
    addTab: function(tabIdent, title, component){
      this.tabs.push({
        ident: tabIdent,
        title: title,
        component: component,
      });

      if(this.preload){
        this.loadedTabsList.push(tabIdent);
      }
    },

    deleteTab: function(tabIdent){
      this.tabs = this.tabs.filter(function(tab){
        return tab.ident !== tabIdent;
      })
    },

    selectTab: function(tab, updateRoute){
      this.currentActiveTab = tab.ident;
      if(typeof updateRoute != 'undefined' && updateRoute && tab.component.route){
        this.$router.push(tab.component.route);
        this.$SmoothScroll(this.id);
      }
    },

    selectTabByIndex: function(index){
      if(typeof this.tabs[index] != 'undefined' && this.activeTab != this.tabs[index].ident){
        this.selectTab(this.tabs[index]);
      }
    },
  },

  watch: {
    currentActiveTab: function(val){
      if(val && _indexOf(this.loadedTabsList, val) == -1){
        this.loadedTabsList.push(val);
      }
    }
  }
}
</script>

<style lang="scss">
@import "~ROOT/styles/config";
@import "~ROOT/styles/utils";

.tabs {
  $colorTabActive: lighten($colorBackground, 7.5%);
  $colorTabInactive: darken($colorTabActive, 5%);
  $colorTabBorder: darken($colorTabInactive, 2%);

  position: relative;
  margin-bottom: $globalPadding;
  border-radius: $globalRoundness;
  overflow: hidden;
  .tabs-menu {
    margin-bottom: 1px;
    background-color: $colorTabInactive;
    @include disable-select;
    ul {
      white-space: nowrap;
    }
    .tabs-menu-item {
      padding: $globalPadding;
      border-bottom: 1px solid $colorTabBorder;
      border-left: 1px solid $colorTabBorder;
      // border-right: 1px solid $colorTabBorder;
      margin-bottom: -1px;
      text-transform: uppercase;
      cursor: pointer;
      transition: background-color $mouseEffectsDuration ease-out, border-color $mouseEffectsDuration ease-out;
      color: rgba($colorText, 0.5);

      @media (max-width: $sm){
        // border-top: 1px solid rgba(black, 0.1);
        font-size: 13px;
        line-height: 1em;
        padding: $globalPadding * 0.75;
      }

      &.loaded {
        color: $colorText;
      }

      &:hover {
        background-color: rgba(white,0.35);
        cursor: pointer;
      }

      &.active {
        border-bottom-color: $colorTabActive;
        // border-left-color: $colorTabActive;
        // border-right-color: $colorTabActive;
        background-color: $colorTabActive;
      }

      &:first-child {
        border-left: none;
      }
    }
  }
  .tabs-content {
    padding: $globalPadding;
    background-color: $colorTabActive;
  }

  &.full-width-menu {
    .tabs-menu ul {
      display: flex;
      justify-content: space-between;
    }
    .tabs-menu-item {
      flex-grow: 1;
      text-align: center;
      &:last-child {
        border-right: 0px;
      }
    }
  }

  &.breath {
    .tabs-menu {
      margin-bottom: $globalPadding;
      .tabs-menu-item {
        border-bottom: 1px solid transparent;
      }
    }
    .tabs-content {
      background-color: transparent;
    }
  }
}
</style>
