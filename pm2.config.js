var config = require('config');

module.exports = {
  apps : [
    {
      name            : 'boilerplate-webapp',
      script          : 'index.js',
      watch           : ['config', 'src/api', 'src/backend', 'src/managers', 'src/models', 'index.js'],
      restart_delay   : 3000,
      error_file      : 'logs/err.log',
      out_file        : 'logs/out.log',
      combine_logs    : true,
      log_date_format : 'YYYY-MM-DD HH:mm:ss',
      env: {
        PORT              : config.port,
        // NODE_ENV          : 'production',
        NODE_PATH         : './src',
        NODE_APP_INSTANCE : '',
      },
    },
  ],
};
