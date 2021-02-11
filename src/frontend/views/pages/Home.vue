<template>
  <div class="home-page">

    <section class="limit-width padded text-center text-content">
      <p>This <a href="https://github.com/wmcmurray/boilerplate-webapp" target="_blank" rel="noopener">boilerplate</a> was made with care by <a href="http://wimantis.ninja" target="_blank" rel="noopener">wimantis</a>.</p>
    </section>

  </div>
</template>

<script>
import AbstractPage from 'COMMON/views/pages/AbstractPage.vue'

export default {
  name: 'home-page',
  extends: AbstractPage,
  data(){
    return {};
  },
}
</script>

<style lang="scss">
@import "~ROOT/styles/config.scss";

.home-page {

}
</style>
