const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Company = require('../entreprise/model');

const Offer = sequelize.define('offers', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  technology: {
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
 
location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  /*company_id:{
    type: Sequelize.INTEGER,
      references: {
        model: Company,
        key: 'id'
      },
      allowNull:true
  }*/







}, {
  timestamps: false
});

// Define associations
/*Offer.belongsTo(Company, { foreignKey: 'company_id' });
Company.hasMany(Offer, { foreignKey: 'company_id' });*/

/*sequelize.sync({ force: true })
  .then(() => {
    console.log('Offer table created successfully.');
  })
  .catch((error) => {
    console.log('Error creating Offer table:', error);
  });*/

module.exports = Offer;
