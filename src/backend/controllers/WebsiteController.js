module.exports = class WebsiteController {

  /**
   * Returns 404 for not found static files
   */
  static staticFilesNotFound(req, res, next) {
    res.status(404);
    res.send();
  }

  /**
  * The entry point of the SPA
  */
  static entryPoint(req, res, next) {
    res.render('index');
  }

};
