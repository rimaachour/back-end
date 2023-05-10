const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Domain = sequelize.define('domains',{
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
  tableName: 'domains',
  timestamps: false
});

// Synchronize the model with the database and create the domains table if it doesn't exist





/*sequelize.sync({ force: true }).then(() => {
  console.log('Tables created successfully');
}).catch((err) => {
  console.error('Unable to create tables:', err);
});*/

module.exports = Domain;
