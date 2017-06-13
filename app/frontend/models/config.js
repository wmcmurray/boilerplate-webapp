var Config = {
  // load config from JS_VARS
  config: JS_VARS.config || {},

  /**
   *  Get the config from front-end cache
   */
  get: function(){
    return this.config;
  }
};

export default Config;
