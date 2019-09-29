var config = require('config');
const session = require('express-session');

var sessionStore;

switch(config.database_object_modeling){
  case 'mongoose' :
    const MongooseDatabase = require('databases/mongoose.js');
    const MongoStore = require('connect-mongo')(session);
    sessionStore = new MongoStore({
      url: MongooseDatabase.getURL(),
      touchAfter: 24 * 3600 // time period in seconds
    });
  break;

  case 'sequelize' :
    const SequelizeDatabase = require('databases/sequelize.js');
    const SequelizeStore = require('express-session-sequelize')(session.Store);
    sessionStore = new SequelizeStore({
      db: SequelizeDatabase,
    });
  break;
}

const sessionMiddleware = session({
  saveUninitialized: false,
  resave: false,
  secret: config.session.secret,
  cookie: {
    httpOnly: true
  },
  store: sessionStore
});

module.exports = sessionMiddleware;
