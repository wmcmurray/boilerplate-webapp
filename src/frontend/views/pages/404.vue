<template>
  <div class="notfound-page limit-width padded">

    <div class="center animated pulse">
      <h1 class="animated pulse">Error 404 !</h1>
      <p>The requested page was not found</p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'notfound-page',
  data(){
    return {};
  },
}
</script>

<style lang="scss">
@import "~ROOT/styles/config.scss";

.notfound-page {
  overflow: hidden;
  text-align: center;
  font-size: 26px;

  .center {
    margin: 50px 0px;

    h1, p {
      margin: 0px;
    }

    h1 {
      margin-bottom: 20px;
      font-size: 46px;
      color: $colorBad;
      text-shadow: 0px 4px 0px rgba(black, 0.15);
    }
  }
}
</style>
