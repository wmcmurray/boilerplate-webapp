// doc : https://github.com/cujojs/rest/blob/master/docs/interfaces.md

import rest from 'rest';
import mime from 'rest/interceptor/mime';
import template from 'rest/interceptor/template';

const API_BASE_URL = 'http://localhost:3001';

let client = rest.wrap(mime).wrap(template);

var api = function(endpoint, params){
  return client({
    path: API_BASE_URL + endpoint,
    params: params || {}
  });
}

export default api;
