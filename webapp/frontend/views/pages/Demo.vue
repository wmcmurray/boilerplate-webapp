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
import _ from 'lodash'
import config from 'ROOT/models/config.js'

export default {
  name: 'demo-page',
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
