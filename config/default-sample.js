const _merge = require('lodash/merge');
const base = require('./base.js');

module.exports = _merge({}, base, {
  port: 3000,

  database: {
    host: 'localhost',
    name: 'webapp'
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
