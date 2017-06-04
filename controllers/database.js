var config = require('config');
var mongoose = require('mongoose');
var DB = null;

mongoose.Promise = global.Promise; // this fixes an undefined Promise error somewere...

module.exports = {
  /**
   *  Starts the connection to the database
   */
  connect: function(cb){
    console.log('Connecting to database at "'+config.database.url+'"...');
    mongoose.connect(config.database.url);
    DB = mongoose.connection;
    DB.on('error', console.error.bind(console, 'connection error:'));
    DB.once('open', function() {
      console.log('Connected to database.');
      cb.call(this);
    });
  },

  /**
   *  Return the current mongoose connection
   */
  getConnection: function(){
    return DB;
  }
}
