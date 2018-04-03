import _ from 'lodash';

var Config = {
  // load config from JS_VARS
  config: JS_VARS.config || {},

  /**
   *  Get the config from front-end cache
   */
  get: function(path){
    return typeof path === 'string' ? _.get(this.config, path, null) : this.config;
  }
};

export default Config;
