const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const preference = sequelize.define('pref', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    //tableName: 'pref',
    timestamps: false
  });
  
/*sequelize.sync({ force: true }).then(() => {
  console.log('Tables created successfully');
}).catch((err) => {
  console.error('Unable to create tables:', err);
});*/

  module.exports = preference;
