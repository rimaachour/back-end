const Sequelize = require('sequelize');
require('dotenv').config();
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER | 'root';
const dbPassword = process.env.DB_PASSWORD | '123456';
const dbPort = process.env.DB_PORT;
const database = process.env.DB_NAME | 'test1';
const sequelize = new Sequelize('test2', 'root', '', {
  host: dbHost,
  dialect: 'mysql',
  // port: dbPort,
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })

  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// const sequelize = new Sequelize('sql7613070','sql7613070','BuWrZAl4qc', {
//   host: 'sql7.freemysqlhosting.net',
//   dialect: 'mysql',
// });
module.exports = sequelize;