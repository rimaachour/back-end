const Sequelize = require('sequelize');

const sequelize = new Sequelize('test2','root','', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;