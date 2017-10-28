var config = require('config');
var mongoose = require('mongoose');
var DB = null;

mongoose.Promise = global.Promise; // this fixes an undefined Promise error somewere...

module.exports = {
  /**
   *  Starts the connection to the database
   */
  connect: function(cb){
    mongoose.connect(this.getURL());
    DB = mongoose.connection;
    DB.on('error', console.error.bind(console, 'connection error:'));
    DB.once('open', function() {
      console.log('Connected to "'+config.database.name+'" database ');
      cb.call(this);
    });
  },

  /**
   *  Return the database URL from config
   */
  getURL: function(){
    return 'mongodb://'+config.database.host+'/'+config.database.name;
  },

  /**
   *  Return the current mongoose connection
   */
  getConnection: function(){
    return DB;
  }
}