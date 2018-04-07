var express = require('express');
var config = require('config');
var router = express.Router();

/* GET not found map files */
router.get(/.*\.(map)$/, function(req, res, next) {
  res.status(404);
  res.send();
});

/**
 *  Set data passed from backend to frontend
 */
router.use(function(req, res, next) {
  var JS_VARS = {
    // session: req.session ? true : false,
    config: {
      about: config.about,
      google_analytics_account: config.google_analytics.account,
    },
  };

  // set data in res.locals
  res.locals.JS_VARS = JS_VARS;
  next();
});

module.exports = router;
