<template>
  <modal :name="name" :width="width" :height="height" @before-open="beforeOpen" @before-close="beforeClose">
    <slot />
  </modal>
</template>

<script>
export default {
  name: 'abstract-modal',
  props: {
    // the name of the modal
    name: {
      type: String,
      default: 'abstract-modal',
    },
    // the width of the modal
    width: {
      type: String,
      default: '60%',
    },
    // the height of the modal
    height: {
      type: String,
      default: 'auto',
    },
  },
  data() {
    return {};
  },
  methods: {
    show() {
      this.$modal.show(this.name);
    },
    hide() {
      this.$modal.hide(this.name);
    },
    beforeOpen(evt) {
    },
    beforeClose(evt) {
    },
  }
}
</script>

<style lang="scss">
@import "~COMMON/styles/config.scss";

.v--modal-overlay {
  z-index: 999999;
  @media (max-width: $sm){
    padding-left: $globalPadding;
    padding-right: $globalPadding;
  }
  @media (max-width: $xs){
    padding-left: 0px;
    padding-right: 0px;
  }
}

.v--modal {
  @media (max-width: $sm){
    width: 96% !important;
    left: 2% !important;
  }
}
</style>
