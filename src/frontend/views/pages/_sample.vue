<template>
  <div class="sample-page">

    <section class="limit-width padded">
      sample page
    </section>

  </div>
</template>

<script>
import AbstractPage from 'COMMON/views/pages/AbstractPage.vue'

export default {
  name: 'sample-page',
  extends: AbstractPage,
  data(){
    return {};
  },
}
</script>

<style lang="scss">
@import "~ROOT/styles/config.scss";

.sample-page {

}
</style>
