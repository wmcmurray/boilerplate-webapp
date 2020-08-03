import axios from 'axios'
import IsLoadingMixin from 'COMMON/mixins/IsLoading.js'

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
        if(err.response.data.message){
          this.$snotify.error(err.response.data.message);
        } else {
          console.error(err);
        }
        this.stopLoading(loadingKey);
        // return null;
        throw err;
      }.bind(this));
    },
  },
}
