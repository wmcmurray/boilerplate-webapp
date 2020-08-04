const express = require('express');
const router = express.Router();

const websiteController = require('controllers/WebsiteController.js');
const websiteVariablesMiddleware = require('middlewares/WebsiteVariables.js');

router.get(/.*\.(map|css)$/, websiteController.staticFilesNotFound);
router.use(websiteVariablesMiddleware);
router.get('*', websiteController.entryPoint);

module.exports = router;
