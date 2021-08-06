<template>
  <div v-if="availableLocales.length > 1" class="locale-switcher">
    <span
      v-for="locale in availableLocales"
      :class="currentLocale === locale ? 'bold' : 'clickable'"
      @click="setCurrentLocale(locale)"
    >{{ locale }}</span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'locale-switcher',
  computed: {
    ...mapGetters([
      'availableLocales',
      'currentLocale',
    ]),
  },
  methods: {
    ...mapActions([
      'setCurrentLocale',
    ]),
  },
}
</script>

<style lang="scss">
@import "~ROOT/styles/config.scss";

.locale-switcher {
  display: inline-block;
  text-align: center;

  > span {
    display: inline-block;
    width: 2em;
    transition: background-color 0.2s ease-out, color 0.2s ease-out;

    &.bold {
      font-weight: bold;
    }
  }
}
</style>
