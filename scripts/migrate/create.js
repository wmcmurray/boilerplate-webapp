const path = require('path');
const fs = require('fs');

const migrationName = process.argv[2];
const fileName = (migrationName ? migrationName : 'unnamed') + '.js';
const filePath = path.resolve(process.cwd(), 'migrations', getCurrentYYYYMMDDHHmms() + '-'+fileName);

fs.writeFileSync(filePath, `const Sequelize = require('sequelize');
const sequelize = require('databases/sequelize.js');
const queryInterface = sequelize.getQueryInterface();

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
