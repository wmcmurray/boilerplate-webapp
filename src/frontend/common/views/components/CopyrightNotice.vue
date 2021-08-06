<template>
  <p class="copyright-notice" v-html="noticeText" />
</template>

<script>
/**
 * Displays a copyright notice for this website
 *
 * How to use :
 * <copyright-notice />
*/
export default {
  name: 'copyright-notice',
  computed: {
    noticeText(){
      const currentYear = (new Date()).getFullYear();
      const about = JS_VARS.about;
      const launched = about.website.launched;
      let author = about.author.name;
      if(about.author.website){
        author = '<a href="'+about.author.website+'" target="_blank" rel="noopener">'+author+'</a>';
      }
      return '&copy; ' + launched + (currentYear > launched ? '-'+currentYear : '') + ' '+author+' - ' + this.$t('copyright_notice');
    },
  },
}
</script>

<style lang="scss">
@import "~ROOT/styles/config.scss";

.copyright-notice {
}
</style>
