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
  internship_level: {
    type: Sequelize.STRING,
    allowNull: false
  },
  duration: {
    type: Sequelize.STRING,
    allowNull: false
  },
type:{
  type: Sequelize.STRING,
    allowNull: false,
},
domain:{
  type: Sequelize.STRING,
    allowNull: false,
},

  company_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  companyId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  status: {
    type: Sequelize.ENUM('active', 'inactive'),
    allowNull: false,
    defaultValue: 'inactive'
  },
  popular: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
}, {
  timestamps: false
});


sequelize.sync({ force: false })
  .then(() => {
    console.log('Offer table created successfully.');
  })
  .catch((error) => {
    console.log('Error creating Offer table:', error);
  });

module.exports = Offer;
