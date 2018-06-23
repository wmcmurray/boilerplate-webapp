<template>
  <abstract-modal :name="name">
    <div id="sample-modal-content">

    </div>
  </abstract-modal>
</template>

<script>
export default {
  name: 'sample-modal',
  data: function() {
    return {
      name: 'sample-modal',
    }
  },
}
</script>

<style lang="scss">
@import "~ROOT/styles/config";

[data-modal="sample-modal"] {
  #sample-modal-content {
    padding: $globalSpacing;
  }
}
</style>
