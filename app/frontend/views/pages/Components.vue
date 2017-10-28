<template>
  <div class="components-page">

    <section class="limit-width padded text-center">
      <div class="grid-4-middle-noBottom">
        <div class="col">
          <div id="loader-container">
            <loader/>
          </div>
        </div>
        <div class="col">
          loading<three-dots :fillVoid="true"/>
        </div>
        <div class="col">
          <progress-bar/>
        </div>
        <div class="col">
          <check :ok="false"/>
          <check :ok="true"/>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: 'components-page',
  data: function(){
    return {}
  }
}
</script>

<style lang="scss">
@import "~ROOT/styles/config";

.components-page {
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
