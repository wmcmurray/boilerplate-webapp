var config = require('config');
var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var DB = require('./managers/database.js');

var app = express();

// Connect to database then initialize the app
DB.connect(function(){
  /**
  *  Sessions related
  */
  const session = require('express-session');
  const MongoStore = require('connect-mongo')(session);

  app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: config.session.secret,
    cookie: {
      httpOnly: true
    },
    store: new MongoStore({
      url: DB.getURL(),
      touchAfter: 24 * 3600 // time period in seconds
    })
  }));


  // view engine setup
  app.set('views', path.join(__dirname, 'app/backend/views'));
  app.set('view engine', 'pug');

  // uncomment after placing your favicon in /public
  // app.use(favicon(path.join(__dirname, 'app/public/images', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'app/public')));

  app.use('/', require('./app/backend/routes/index'));
  app.use('/api', require('./app/backend/routes/api'));
  app.use('/', require('./app/backend/routes/fallback'));

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  // Get port from environment and store in Express.
  var port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);

  // Create HTTP server.
  var server = http.createServer(app);

  // Listen on provided port, on all network interfaces.
  server.listen(port);

  server.on('error', function(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

  server.on('listening', function() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;

    console.log('Running on ' + bind);
  });
});


/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

module.exports = app;
