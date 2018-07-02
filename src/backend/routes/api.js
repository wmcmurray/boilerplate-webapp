var express = require('express');
var router = express.Router();
// const Joi = require('joi');
const { initialize } = require('hapi.js');

// const serverController = require('controllers/api/ServerController.js');
const usersController = require('controllers/api/UsersController.js');

initialize(router, [

  // SERVER
  // ------------------------------
  // {
  //   method  : 'GET',
  //   path    : '/server',
  //   handler : serverController.getServerInfos,
  // },

  // USERS
  // ------------------------------
  {
    method  : 'GET',
    path    : '/users',
    handler : usersController.listAll,
  },
  {
    method  : 'GET',
    path    : '/users/{username}',
    handler : usersController.getOneFromUsername,
  },
  {
    method  : 'POST',
    path    : '/users/{username}',
    handler : usersController.createOneFromUsername,
  },
  {
    method  : 'DELETE',
    path    : '/users/{username}',
    handler : usersController.deleteOneFromUsername,
  },

]);

module.exports = router;
