const config = require('config');

module.exports = {
  apps : [
    {
      name            : 'boilerplate-webapp',
      script          : 'index.js',
      watch           : ['config', 'src/backend', 'index.js'],
      restart_delay   : 3000,
      error_file      : 'logs/err.log',
      out_file        : 'logs/out.log',
      combine_logs    : true,
      log_date_format : 'YYYY-MM-DD HH:mm:ss',
      env: {
        PORT              : config.port,
        // NODE_ENV          : 'production',
        NODE_PATH         : './src/backend',
        NODE_APP_INSTANCE : '',
      },
    },
  ],
};
