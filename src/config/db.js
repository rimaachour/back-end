const Sequelize = require('sequelize');

const sequelize = new Sequelize('sql7613070','sql7613070','BuWrZAl4qc', {
  host: 'sql7.freemysqlhosting.net',
  dialect: 'mysql',
});

module.exports = sequelize;