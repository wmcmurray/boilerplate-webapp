<script>
import SeoUpdatesMixin from 'COMMON/views/pages/mixins/SeoUpdates.js'
import ScrollToHashMixin from 'COMMON/views/pages/mixins/ScrollToHash.js'

export default {
  name: 'abstract-page',
  mixins: [
    SeoUpdatesMixin,
    ScrollToHashMixin,
  ],
}
</script>
