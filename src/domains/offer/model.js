const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require("../../config/db");
const Company = require('../entreprise/model');

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

// Define associations
Offer.belongsTo(Company, { foreignKey: 'compagny_id' });

sequelize.sync()
  .then(() => {
    console.log('Offer table created successfully.');
  })
  .catch((error) => {
    console.log('Error creating Offer table:', error);
  });

  Company.findOne({ where: { id: 1 }, include: Offer })
  .then((entreprise) => {
    console.log('Entreprise:', entreprise);
    console.log('Offers:', entreprise.Offers);
  })
  .catch((error) => {
    console.log('Error retrieving Entreprise:', error);
  });

Offer.findOne({ where: { id: 1 }, include: Company })
  .then((offer) => {
    console.log('Offer:', offer);
    console.log('Entreprise:', offer.Company);
  })
  .catch((error) => {
    console.log('Error retrieving Offer:', error);})








module.exports = Offer;
