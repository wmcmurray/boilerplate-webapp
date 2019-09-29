const Sequelize = require('sequelize');
const sequelize = require('databases/sequelize.js');

var theModel = sequelize.define('user', {
  username  : Sequelize.STRING,
  points    : {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['username']
    },
  ]
});

/**
 * Find a user from it's username
 */
theModel.findByUsername = function(username) {
  return this.findOne({ where: {username: username} });
};

module.exports = theModel;
