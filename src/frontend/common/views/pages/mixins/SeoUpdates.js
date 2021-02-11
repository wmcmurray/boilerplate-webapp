import _cloneDeep from 'lodash/cloneDeep.js'

/**
* Implements the update of page title and metas when the page changes
* @TODO changer l'og:url aussi quand la page change ?
* @TODO create og:image tag if don't exist and make sure the url is absolute
*/
export default {
  data(){
    return {
      seoTitleSuffixEnabled: false,
      seoParams: _cloneDeep(JS_VARS.seo),
    };
  },
  methods: {
    setMetaTagContent(property = '', content = '') {
      const metas = document.getElementsByTagName('meta');

      for(let index = 0; index < metas.length; index++) {
        const meta = metas[index];
        const metaName = meta.getAttribute('name');
        const metaProperty = meta.getAttribute('property');

        if(metaName === property || metaProperty === property) {
          meta.setAttribute('content', content);
        }
      }
    },
  },
  watch: {
    'seoParams.title': {
      immediate: true,
      handler(nv, ov) {
        if(this.seoTitleSuffixEnabled && nv !== JS_VARS.seo.title) {
          nv += ' - ' + JS_VARS.seo.title;
        }
        if(window.document.title !== nv) {
          window.document.title = nv;
        }
        this.setMetaTagContent('og:title', nv);
      },
    },
    'seoParams.description': {
      immediate: true,
      handler(nv, ov) {
        this.setMetaTagContent('description', nv);
        this.setMetaTagContent('og:description', nv);
      },
    },
    // 'seoParams.og_image': {
    //   immediate: true,
    //   handler(nv, ov) {
    //     this.setMetaTagContent('og:image', nv);
    //   },
    // },
  },
}
