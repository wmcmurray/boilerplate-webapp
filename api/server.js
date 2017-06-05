const Boom = require('boom');
const Joi = require('joi');

module.exports = [

  /**
   *  Return public config data
   */
  {
    method: 'GET',
    path: '/server',
    handler: function (request, reply) {
      reply({
        version: request.server.version,
        load: request.server.load,
      });
    }
  },

];
