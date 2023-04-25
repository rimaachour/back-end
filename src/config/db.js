const Sequelize = require("sequelize");

require('dotenv').config();
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER | 'root';
const dbPassword = process.env.DB_PASSWORD | '123456';
const dbPort = process.env.DB_PORT;
const database = process.env.DB_NAME | 'test1';
const sequelize = new Sequelize('test2', 'root', '123456', {
  host: dbHost,
  dialect: 'mysql',
  // port: dbPort,
});




module.exports = sequelize