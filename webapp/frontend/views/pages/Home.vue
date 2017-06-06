<template>
  <div class="home-page">

    <section class="limit-width padded text-center">
      <p>This boilerplate was made with <span class="text-tertiary animated rubberBand infinite" id="heart">&hearts;</span> by <a href="http://wimantis.ninja" target="_blank">wimantis</a>.</p>
    </section>

  </div>
</template>

<script>
import config from './../../models/config.js'
import _ from 'lodash'

export default {
  name: 'home-page',
  data: function(){
    return {
      config: config.get()
    }
  }
}
</script>

<style lang="scss">
@import "webapp/frontend/styles/config";
@import "webapp/frontend/styles/utils";
@import "webapp/frontend/styles/animate";
@import "webapp/frontend/styles/grid";

.home-page {
  #heart {
    display: inline-block;
    font-size: 1.5em;
  }
}
</style>
