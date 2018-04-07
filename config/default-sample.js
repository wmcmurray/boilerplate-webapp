const _ = require('lodash');
const base = require('./base.js');

module.exports = _.merge({}, base, {
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
