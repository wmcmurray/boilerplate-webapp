var express = require('express');
var config = require('config');
var router = express.Router();

/* GET not found static files */
router.get(/.*\.(map|css)$/, function(req, res, next) {
  res.status(404);
  res.send();
});

/**
 *  Set data passed from backend to frontend
 */
router.use(function(req, res, next) {
  var JS_VARS = {
    // session     : req.session ? true : false,
    about       : config.about,
    ga_account  : config.google_analytics.account,
  };

  // set data in res.locals
  res.locals.JS_VARS = JS_VARS;
  res.locals.seo = config.seo;
  res.locals.base_url = req.protocol + '://' + req.get('host');
  res.locals.canonical_url = req.protocol + '://' + req.get('host') + req.path;
  next();
});

/* GET home page. */
router.get('*', function(req, res, next) {
  res.render('index');
});

module.exports = router;
