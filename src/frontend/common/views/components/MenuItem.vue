<template>
  <li class="menu-item">
    <router-link v-if="link.route" :to="link.route" :exact="link.exact">{{ link.html }}</router-link>
    <a v-else :href="link.href" target="_blank" rel="noopener">{{ link.html }}</a>
  </li>
</template>

<script>
/**
 * Displays an item in a menu
 *
 * How to use :
 * <menu-item :link="OBJECT" />
*/
export default {
  name: 'menu-item',
  props: {
    // properties of the link to display
    link: {
      type: Object,
      required: true,
    },
  },
  data(){
    return {};
  },
}
</script>

<style lang="scss">
@import "~COMMON/styles/config.scss";

.menu-item {
}
</style>
