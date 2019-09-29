var config = require('config');

var app;

switch (config.database_object_modeling) {
  case 'mongoose':
    var MongooseDatabase = require('databases/mongoose.js');
    MongooseDatabase.connect(function(){
      console.log('MONGOOSE : connected to "'+config.mongoose.name+'" database ');
      app = require('index.js');
    });
  break;

  case 'sequelize':
    var SequelizeDatabase = require('databases/sequelize.js');

    // load models before sync
    require('models/sequelize/User.js');

    SequelizeDatabase.sync().then(function(){
      console.log('SEQUELIZE : database "'+config.sequelize.database+'" is now synched ');
      app = require('index.js');
    });
  break;

  default :
    app = require('index.js');
  break;
}

module.exports = app;
