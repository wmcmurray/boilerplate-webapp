import axios from 'axios'
import IsLoadingMixin from 'ROOT/mixins/IsLoading.js'

var API_BASE_URL = window.location.protocol + '//' + window.location.host + '/api';

/**
* Implements wrapper method to call the API and handle errors in a central place
*/
export default {
  mixins: [
    IsLoadingMixin,
  ],
  methods: {
    /**
     * Call the API and return a promise
     */
    api: function(method, endpoint, data) {
      data = data || {};
      var options = {
        method    : method,
        url       : API_BASE_URL + endpoint,
      };

      if(method === 'get'){
        options.params = data;
      } else {
        options.data = data;
      }

      var loadingKey = ['api', method, endpoint].join('-');

      this.startLoading(loadingKey);
      return axios(options).then(function(res) {
        this.stopLoading(loadingKey);
        return res.data;
      }.bind(this)).catch(function(err) {
        this.$snotify.error(err.message || err);
        // console.error(err);
        this.stopLoading(loadingKey);
        // return null;
        throw err;
      }.bind(this));
    },
  },
}
