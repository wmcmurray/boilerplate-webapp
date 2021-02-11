/**
* Automatically scroll to the window hash when page loaded
*/
export default {
  mounted() {
    if(this.$route.hash) {
      const hash = this.$route.hash.substr(1);
      const elem = document.getElementById(hash);

      if(elem) {
        this.$nextTick(() => {
          this.$SmoothScroll(elem);
        });
      }
    }
  },
}
