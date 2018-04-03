import axios from 'axios';

var API_BASE_URL = window.location.protocol + '//' + window.location.host + '/api';

var api = function(method, endpoint, data){
  data = data || {};

  return axios({
    method    : method,
    url       : API_BASE_URL + endpoint,
    data      : data,
  }).then(function(res) {
    return res.data;
  }).catch(function(err) {
    // console.error(err);
    // throw err;
    return null;
  });
}

export default api;
