const _merge = require('lodash/merge.js');
const base = require('./base.js');

module.exports = _merge({}, base, {
  port: 3000,

  mongoose: {
    host: 'localhost',
    name: 'webapp'
  },

  sequelize: {
    database: 'webapp',
    username: 'postgres',
    password: '',
    options: {
      host: 'localhost',
      dialect: 'postgres', // (mysql | sqlite | postgres | mssql)
      logging: false,
    }
  },

  session: {
    secret: 'SUPER_SECRET_PASSWORD'
  },

  cors: {
    origin: ['*']
  },

  google_analytics: {
    account: '',
  },
});
