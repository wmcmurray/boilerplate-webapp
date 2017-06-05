const Boom = require('boom');
const Joi = require('joi');

var User = require('./../models/User');

module.exports = [

  /**
   *  Return the list of all users
   */
  {
    method: 'GET',
    path: '/users',
    handler: function (request, reply) {
      User.find({}).exec(function(err, docs){
        if(err){
          reply(Boom.badImplementation());
        } else {
          reply(docs);
        }
      });
    }
  },

  /**
   *  Return a single user from it's username
   */
  {
    method: 'GET',
    path: '/users/{username}',
    handler: function (request, reply) {
      User.findByUsername(request.params.username, function(err, doc){
        if(err){
          reply(Boom.badImplementation());
        } else if(!doc) {
          reply(Boom.notFound());
        } else {
          reply(doc);
        }
      });
    }
  },

  /**
   *  Create a user from username and return it
   */
  {
    method: 'POST',
    path: '/users/{username}',
    handler: function (request, reply) {
      User.findByUsername(request.params.username, function(err, doc){
        if(err){
          reply(Boom.badImplementation());
        } else if(doc){
          reply(Boom.forbidden('This username already exists.'));
        } else {
          var user = new User({
            username: request.params.username,
          });

          user.save(function(){
            reply(user);
          });
        }
      });
    }
  },

];
