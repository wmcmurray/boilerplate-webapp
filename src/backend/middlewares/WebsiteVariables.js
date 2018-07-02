var path = require('path');
var config = require('config');
var packageJson = require(path.join(process.cwd(), '/package.json'));

/**
 * Set variables into the views of whe main entry point of the SPA
 */
module.exports = function(req, res, next) {
  var JS_VARS = {
    // session     : req.session ? true : false,
    about       : config.about,
    app_version : packageJson.version || null,
    ga_account  : config.google_analytics.account,
  };

  // set data in res.locals
  res.locals.JS_VARS = JS_VARS;
  res.locals.seo = config.seo;
  res.locals.base_url = req.protocol + '://' + req.get('host');
  res.locals.canonical_url = req.protocol + '://' + req.get('host') + req.path;
  next();
};
