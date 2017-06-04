const Hapi = require('hapi');
const Boom = require('boom');
const Joi = require('joi');
var config = require('config');
var databaseCtrl = require('./controllers/database.js');

// Create a server with a host and port
const server = new Hapi.Server();
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
  /**
   *  Return public config data
   */
  server.route({
    method: 'GET',
    path: '/config',
    handler: function (request, reply) {
      reply({
        about: config.about,
      });
    }
  });

  // Start the server
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('API running at:', server.info.uri);
  });
});
