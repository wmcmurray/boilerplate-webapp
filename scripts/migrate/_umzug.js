const Database = require('databases/sequelize.js');
const Umzug = require('umzug');

const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize: Database,
  }
});

module.exports = umzug;
