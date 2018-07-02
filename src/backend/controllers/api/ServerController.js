module.exports = class ServerController {

  /**
   * Return public server state/config data
   */
  static getServerInfos(request, reply) {
    reply({
      version: request.server.version,
      load: request.server.load,
    });
  }

};
