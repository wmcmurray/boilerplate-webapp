import axios from 'axios'
import app from 'ROOT/index.js'

var API_BASE_URL = window.location.protocol + '//' + window.location.host + '/api';

export default function(method, endpoint, data){
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

  return axios(options).then(function(res) {
    return res.data;
  }).catch(function(err) {
    app.$snotify.error(err.message || err);
    // console.error(err);
    // return null;
    throw err;
  });
}
