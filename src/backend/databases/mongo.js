var config = require('config');
var mongoose = require('mongoose');
var DB = null;

mongoose.Promise = global.Promise; // this fixes an undefined Promise error somewere...

module.exports = {
  /**
   *  Starts the connection to the database
   */
  connect: function(cb){
    mongoose.connect(this.getURL(), {
      useMongoClient: true,
    });
    DB = mongoose.connection;
    DB.on('error', console.error.bind(console, 'connection error:'));
    DB.once('open', function() {
      console.log('Connected to "'+config.mongo.name+'" database ');
      cb.call(this);
    });
  },

  /**
   *  Return the database URL from config
   */
  getURL: function(){
    return 'mongodb://'+config.mongo.host+'/'+config.mongo.name;
  },

  /**
   *  Return the current mongoose connection
   */
  getConnection: function(){
    return DB;
  }
}
