var path = require('path');
var fs = require('fs');

var migrationName = process.argv[2];
var fileName = (migrationName ? migrationName : 'unnamed') + '.js';
var filePath = path.resolve(process.cwd(), 'migrations', getCurrentYYYYMMDDHHmms() + '-'+fileName);

fs.writeFileSync(filePath, `var Sequelize = require('sequelize');
var sequelize = require('databases/sequelize.js');
var queryInterface = sequelize.getQueryInterface();

module.exports = {
  up: () => {
    // return queryInterface.createTable('test', { id: Sequelize.INTEGER });
  },

  down: () => {
    // return queryInterface.dropTable('test');
  }
};
`);

function format (i) {
  return parseInt(i, 10) < 10 ? '0' + i : i;
};

function getCurrentYYYYMMDDHHmms() {
  const date = new Date();
  return [
    date.getUTCFullYear(),
    format(date.getUTCMonth() + 1),
    format(date.getUTCDate()),
    format(date.getUTCHours()),
    format(date.getUTCMinutes()),
    format(date.getUTCSeconds())
  ].join('');
}
