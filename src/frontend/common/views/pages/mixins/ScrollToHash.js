/**
* Automatically scroll to the window hash when page loaded
*/
export default {
  mounted() {
    if(this.$route.hash) {
      this.scrollToRouteHash();
    }
  },
  methods: {
    scrollToRouteHash() {
      const hash = this.$route.hash.substr(1);
      const elem = document.getElementById(hash);

      if(elem) {
        this.$nextTick(() => {
          this.$SmoothScroll(elem);
        });
      }
    },
  },
  watch: {
    '$route.hash'(nv, ov) {
      if(nv && nv !== ov) {
        this.scrollToRouteHash();
      }
    },
  },
}
