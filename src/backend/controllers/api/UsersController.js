const Boom = require('boom');
const config = require('config');

switch (config.database_object_modeling) {
  case 'mongoose':
    var User = require('models/mongoose/User');
  break;
  case 'sequelize':
    var User = require('models/sequelize/User');
  break;
}

module.exports = class UsersController {

  /**
   * Return the list of all users
   */
  static listAll(request, reply) {
    switch (config.database_object_modeling) {

      case 'mongoose':
        User.find({}).exec(function(err, docs){
          if(err){
            reply(Boom.badImplementation());
          } else {
            reply(docs);
          }
        });
      break;

      case 'sequelize':
        User.findAll().then(function(users) {
          reply(users);
        }).catch(function(err){
          reply(Boom.badImplementation());
        });
      break;

      default :
        reply(Boom.forbidden('A valid database object modeling is needed'));
      break;

    }
  }

  /**
   * Return a single user from it's username
   */
  static getOneFromUsername(request, reply) {
    switch (config.database_object_modeling) {

      case 'mongoose':
        User.findByUsername(request.params.username, function(err, doc){
          if(err){
            reply(Boom.badImplementation());
          } else if(!doc) {
            reply(Boom.notFound());
          } else {
            reply(doc);
          }
        });
      break;

      case 'sequelize':
        User.findByUsername(request.params.username).then(function(user) {
          reply(user ? user : Boom.notFound());
        }).catch(function(err){
          reply(Boom.badImplementation());
        });
      break;

      default :
        reply(Boom.forbidden('A valid database object modeling is needed'));
      break;

    }
  }

  /**
   * Create a user from username and return it
   */
  static createOneFromUsername(request, reply) {
    var data = {
      username: request.params.username,
    };
    switch (config.database_object_modeling) {

      case 'mongoose':
        User.findByUsername(request.params.username, function(err, doc){
          if(err){
            reply(Boom.badImplementation());
          } else if(doc){
            reply(Boom.forbidden('This username already exists.'));
          } else {
            var user = new User(data);

            user.save(function(err){
              if(err){
                reply(Boom.badImplementation());
              } else {
                reply(user);
              }
            });
          }
        });
      break;

      case 'sequelize':
        User.findOrCreate({where: {username: request.params.username}, defaults: data}).spread(function(user, created) {
          reply(created ? user : Boom.forbidden('This username already exists.'));
        }).catch(function(err){
          reply(Boom.badImplementation());
        });
      break;

      default :
        reply(Boom.forbidden('A valid database object modeling is needed'));
      break;

    }
  }

  /**
   * Delete a user from username
   */
  static deleteOneFromUsername(request, reply) {
    switch (config.database_object_modeling) {

      case 'mongoose':
        User.findByUsername(request.params.username, function(err, doc){
          if(err){
            reply(Boom.badImplementation());
          } else if(!doc){
            reply(Boom.notFound());
          } else {
            doc.remove(function(err){
              if(err){
                reply(Boom.badImplementation());
              } else {
                reply(true);
              }
            });
          }
        });
      break;

      case 'sequelize':
        User.findByUsername(request.params.username).then(function(user) {
          if(user){
            user.destroy().then(function(){
              reply(true);
            });
          } else {
            reply(Boom.notFound());
          }
        }).catch(function(err){
          reply(Boom.badImplementation());
        });
      break;

      default :
        reply(Boom.forbidden('A valid database object modeling is needed'));
      break;

    }
  }

};
