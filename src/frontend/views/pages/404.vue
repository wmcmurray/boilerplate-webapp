<template>
  <div class="notfound-page limit-width padded">

    <div class="center">
      <h1>Error 404</h1>
      <p>The requested page was not found</p>
    </div>

  </div>
</template>

<script>
import AbstractPage from 'COMMON/views/pages/AbstractPage.vue'

export default {
  name: 'notfound-page',
  extends: AbstractPage,
  data(){
    return {};
  },
}
</script>

<style lang="scss">
@import "~ROOT/styles/config.scss";

.notfound-page {
  text-align: center;
  font-size: 26px;
  line-height: $globalLineHeight;

  .center {
    color: $colorBad;

    h1, p {
      margin: 0px;
    }
  }
}
</style>
