<template>
  <div class="demo-page">

    <section class="limit-width padded text-center">
      <div class="grid-4-middle-noBottom">
        <div class="col">
          <div id="loader-container">
            <loader></loader>
          </div>
        </div>
        <div class="col">
          loading<three-dots></three-dots>
        </div>
        <div class="col">
          <progress-bar></progress-bar>
        </div>
        <div class="col">
          <check :ok="false"></check>
          <check :ok="true"></check>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import config from './../../models/config.js'
import _ from 'lodash'

export default {
  name: 'demo-page',
  data () {
    return {
      config: config.get()
    }
  }
}
</script>

<style lang="scss">
@import "webapp/src/styles/config";
@import "webapp/src/styles/utils";
@import "webapp/src/styles/animate";
@import "webapp/src/styles/grid";

.demo-page {
  > section {
    padding-top: $globalSpacing;
    padding-bottom: $globalSpacing;
  }

  #loader-container {
    position: relative;
    height: 150px;
    border-radius: $globalRoundness;
    overflow: hidden;
  }
}
</style>
