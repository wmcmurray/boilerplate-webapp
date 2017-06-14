<template>
  <div class="home-page">

    <section class="limit-width padded text-center">
      <p>This <a href="https://github.com/wmcmurray/boilerplate-webapp" target="_blank">boilerplate</a> was made with care by <a href="http://wimantis.ninja" target="_blank">wimantis</a>.</p>
    </section>

  </div>
</template>

<script>
import _ from 'lodash'
import config from 'ROOT/models/config.js'

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
@import "~ROOT/styles/config";
@import "~ROOT/styles/utils";
@import "~ROOT/styles/animate";
@import "~ROOT/styles/grid";

.home-page {

}
</style>
