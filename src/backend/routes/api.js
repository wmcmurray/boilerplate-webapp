var config = require('config');
var express = require('express');
var router = express.Router();

const Hapi = require('hapi');
const Boom = require('boom');
const Joi = require('joi');

const server = new Hapi.Server();
server.connection();

// all required routes
var routes = [].concat(
  // require('routes/api/server'),
  require('routes/api/users'),
);

// add route listing all routes
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

// fallback
server.route({
  method: 'GET',
  path: '/{path*}',
  handler: function (request, reply) {
    reply(Boom.notImplemented());
  }
});

// pass request to Hapi server
router.all('*', function(req, res, next) {
  server.inject({
    method  : req.method,
    url     : req.url,
    headers : req.headers,
    payload : req.body,
  }).then(function(response){
    res.status(response.statusCode).json(response.result);
  }).catch(function(err){
    next(err);
  });
});

module.exports = router;
