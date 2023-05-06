const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const preference = sequelize.define('preferences', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'preferences',
    timestamps: false
  });
  
  // Synchronize the model with the database and create the domains table if it doesn't exist
  sequelize.sync()
  .then(() => {
    console.log('preference table created successfully.');
  })
  .catch((error) => {
    console.log('Error creating preference table:', error);
  });
  module.exports = preference;
