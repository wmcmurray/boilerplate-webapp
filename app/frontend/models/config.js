import API from 'ROOT/controllers/api.js'

var Config = {
  config: null,

  /**
   *  Get the config from the API
   */
  getConfigFromAPI: function(cb){
    API('/config').then(function(res){
      this.config = res.entity;
      cb(res.entity);
    }.bind(this));
  },

  /**
   *  Get the config from front-end cache
   */
  get: function(){
    return this.config || {};
  }
};

export default Config;
