<template>
  <div class="components-page">

    <section class="limit-width padded text-center">
      <div class="grid-4-middle-noBottom">
        <div class="col">
          <div id="spinner-container">
            <overlay-spinner />
          </div>
        </div>
        <div class="col">
          loading<three-dots :fillVoid="true" />
        </div>
        <div class="col">
          <progress-bar />
        </div>
        <div class="col">
          <check :ok="false" />
          <check :ok="true" />
        </div>
      </div>
    </section>

    <section class="limit-width padded text-center">
      <tabs>
        <tab title="Bear landscape">
          <div style="max-width:800px;margin-left:auto;margin-right:auto;">
            <lazyimg src="https://placebear.com/800/450" ratio="landscape" />
          </div>
        </tab>
        <tab title="Bears portrait">
          <div class="grid-2">
            <div class="col">
              <lazyimg src="https://placebear.com/450/800" ratio="portrait" />
            </div>
            <div class="col">
              <lazyimg src="https://placebear.com/900/1600" ratio="portrait" />
            </div>
          </div>
        </tab>
        <tab title="Bears square">
          <div class="grid-4">
            <div class="col">
              <lazyimg src="https://placebear.com/500/500" ratio="square" />
            </div>
            <div class="col">
              <lazyimg src="https://placebear.com/400/400" ratio="square" />
            </div>
            <div class="col">
              <lazyimg src="https://placebear.com/600/600" ratio="square" />
            </div>
            <div class="col">
              <lazyimg src="https://placebear.com/700/700" ratio="square" />
            </div>
          </div>
        </tab>
      </tabs>
    </section>

  </div>
</template>

<script>
export default {
  name: 'components-page',
  data: function(){
    return {}
  },
}
</script>

<style lang="scss">
@import "~ROOT/styles/config";

.components-page {
  > section {
    padding-top: $globalSpacing;
    padding-bottom: $globalSpacing;
  }

  #spinner-container {
    position: relative;
    min-height: 150px;
    overflow: hidden;
  }
}
</style>
