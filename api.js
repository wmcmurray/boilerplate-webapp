const Hapi = require('hapi');
const Boom = require('boom');
const Joi = require('joi');
var config = require('config');
var databaseCtrl = require('./controllers/database.js');

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

databaseCtrl.connect(function() {

  // all required routes
  var routes = [].concat(
    // require('./api/server'),
    require('./api/config'),
    require('./api/users')
  );

  // log all requests
  server.on('response', function (request) {
    console.log(request.method.toUpperCase() + ' ' + request.url.path + ' ' + request.response.statusCode);
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
