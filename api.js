const Hapi = require('hapi');
const Boom = require('boom');
const Joi = require('joi');
const chalk = require('chalk');
var config = require('config');
var DB = require('./managers/database.js');

// Create a server with a host and port
const server = new Hapi.Server({load: { sampleInterval: 1000 }});
server.connection({
  host: '0.0.0.0',
  port: 3001,
  routes: {
    cors: {
      origin: config.cors.origin
    }
  }
});

DB.connect(function() {

  // all required routes
  var routes = [].concat(
    // require('./api/server'),
    require('./api/users')
  );

  // log all requests
  server.on('response', function (request) {
    var code = request.response.statusCode;
    if(code >= 200 && code < 300){
      code = chalk.green(code);
    } else if(code >= 300 && code < 400){
      code = chalk.cyan(code);
    } else if(code >= 400){
      code = chalk.red(code);
    }
    console.log([code, request.method.toUpperCase(), request.url.path].join(' '));
  });

  // add route that list all routes
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply({
        about: 'This is the API of '+config.about.website.name+'.',
        available_routes: routes.map(function(route){
          return [route.method, route.path].join(' ');
        })
      });
    }
  });

  // bind all required routes
  server.route(routes);

  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Running on port '+server.info.port);
  });
});

module.exports = server;
