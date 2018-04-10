const Sequelize = require('sequelize');
const config = require('config');
const sequelize = new Sequelize(config.sequelize.database, config.sequelize.username, config.sequelize.password, config.sequelize.options);

module.exports = sequelize
