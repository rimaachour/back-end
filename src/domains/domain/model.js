const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Domain = sequelize.define('domains', {
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
    tableName: 'domains',
    timestamps: false
  });
  
  // Synchronize the model with the database and create the domains table if it doesn't exist
  sequelize.sync()
  .then(() => {
    console.log('Offer table created successfully.');
  })
  .catch((error) => {
    console.log('Error creating Offer table:', error);
  });
  module.exports = Domain;
