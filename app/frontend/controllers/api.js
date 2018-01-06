// doc : https://github.com/cujojs/rest/blob/master/docs/interfaces.md

import rest from 'rest';
import mime from 'rest/interceptor/mime';
import template from 'rest/interceptor/template';

var API_BASE_URL = window.location.protocol + '//' + window.location.hostname + ':3001';

var client = rest.wrap(mime).wrap(template);

var api = function(endpoint, props){
  props = props || {};
  props.path = API_BASE_URL + endpoint;

  return client(props);
}

export default api;
