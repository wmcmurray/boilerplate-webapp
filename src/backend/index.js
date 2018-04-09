var config = require('config');
var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var DB = require('managers/database.js');

var app = express();
var port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

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
app.set('views', path.join(process.cwd(), 'src/backend/views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(process.cwd(), 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/api', require('routes/api'));
app.use('/', require('routes/website'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

// Connect to database then initialize the server
DB.connect(function(){
  var server = http.createServer(app);
  server.listen(port);

  server.on('error', function(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

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
