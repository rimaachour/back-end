const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require("../../config/db");

const Offer = sequelize.define('Offer', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  Title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Technology: {
    type: Sequelize.STRING,
    allowNull: false
  },
  compagny_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
domain: {
    type: Sequelize.STRING,
    allowNull: false
  },
location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  

}, 




{
  timestamps: false
});

sequelize.sync()
  .then(() => {
    console.log('offer table created successfully.');
  })
  .catch((error) => {
    console.log('Error creating offer table:', error);
  });

module.exports = Offer;
