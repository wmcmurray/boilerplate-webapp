const _pick = require('lodash/pick.js');
const path = require('path');
const config = require('config');
const packageJson = require(path.join(process.cwd(), '/package.json'));

/**
 * Set variables into the views of whe main entry point of the SPA
 */
module.exports = function(req, res, next) {
  const JS_VARS = {
    // session     : req.session ? true : false,
    about       : config.about,
    seo         : _pick(config.seo, ['title', 'description', 'keywords', 'og_image']),
    app_version : packageJson.version || null,
    ga_account  : config.google_analytics.account,
    db_object_modeling : config.database_object_modeling,
  };

  // set data in res.locals
  res.locals.JS_VARS = JS_VARS;
  res.locals.seo = config.seo;
  res.locals.base_url = req.protocol + '://' + req.get('host');
  res.locals.canonical_url = req.protocol + '://' + req.get('host') + req.path;
  next();
};
