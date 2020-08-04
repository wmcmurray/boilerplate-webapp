const config = require('config');
const mongoose = require('mongoose');
let DB = null;

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
      cb.call(this);
    });
  },

  /**
   *  Return the database URL from config
   */
  getURL: function(){
    return 'mongodb://'+config.mongoose.host+'/'+config.mongoose.name;
  },

  /**
   *  Return the current mongoose connection
   */
  getConnection: function(){
    return DB;
  }
};
