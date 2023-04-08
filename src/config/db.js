const Sequelize = require('sequelize');

const sequelize = new Sequelize('test1_db','root','', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;