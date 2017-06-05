const Boom = require('boom');
const Joi = require('joi');

var config = require('config');

module.exports = [

  /**
   *  Return public config data
   */
  {
    method: 'GET',
    path: '/config',
    handler: function (request, reply) {
      reply({
        about: config.about,
      });
    }
  },

];
