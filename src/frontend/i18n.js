import Vue from 'vue'
import VueI18n from 'vue-i18n'

import fr from 'ROOT/translations/fr.yaml'
import en from 'ROOT/translations/en.yaml'

Vue.use(VueI18n)

export default new VueI18n({
  locale  : JS_VARS.locale,
  messages: {
    fr,
    en,
  },
});
