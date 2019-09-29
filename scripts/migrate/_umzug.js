var Database = require('databases/sequelize.js');
var Umzug = require('umzug');

var umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize: Database,
  }
});

module.exports = umzug;
