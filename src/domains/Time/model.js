const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Time =  sequelize.define('Time', {
     id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
   
  });
  sequelize.sync({ force: false }).then(() => {
  console.log('Tables created successfully');
}).catch((err) => {
  console.error('Unable to create tables:', err);
});
module.exports = Time;