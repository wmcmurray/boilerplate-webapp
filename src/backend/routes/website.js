var express = require('express');
var router = express.Router();

var websiteController = require('controllers/WebsiteController.js');
var websiteVariablesMiddleware = require('middlewares/WebsiteVariables.js');

router.get(/.*\.(map|css)$/, websiteController.staticFilesNotFound);
router.use(websiteVariablesMiddleware);
router.get('*', websiteController.entryPoint);

module.exports = router;
