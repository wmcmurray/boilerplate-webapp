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
  var JS_VARS = {};

  // check if session exists
  if(req.session){
    JS_VARS.session = true;
    done();
  } else {
    done();
  }

  // call this upon completion
  function done(){
    res.locals.JS_VARS = JS_VARS;
    next();
  }
});

module.exports = router;
