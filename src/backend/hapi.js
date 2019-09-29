const config = require('config');
const Hapi = require('hapi');
const Boom = require('boom');

const server = new Hapi.Server();
server.connection();

 /**
 * Add routes (should only be called once !) and do other things
 */
module.exports.initialize = function(router, routes) {

  // add route listing all routes
  server.route({
    method  : 'GET',
    path    : '/',
    handler : function (request, reply) {
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
    method  : 'GET',
    path    : '/{path*}',
    handler : function (request, reply) {
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

};
