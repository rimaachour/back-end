const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require("../../config/db");
const Offer=require("../offer/model")

const Company = sequelize.define('company', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  confirmpassword: {
    type: Sequelize.STRING,
    allowNull: false
  },
  OTP: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  role: {
    type: Sequelize.ENUM('student', 'company'),
    allowNull: false
  },
  resetPasswordToken: {
    type: Sequelize.STRING,
    allowNull: true
  },
  resetPasswordExpires: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  description :{
    type: Sequelize.STRING,
    allowNull: false

  },
  domain :{
    type: Sequelize.STRING,
    allowNull: false

  },
  adress : {
    type: Sequelize.STRING,
    allowNull: false

  },
  logo:{
    type: Sequelize.STRING,
    allowNull: false
  },

}, 




{
  timestamps: false
});

sequelize.sync()
  .then(() => {
    console.log('Company table created successfully.');
  })
  .catch((error) => {
    console.log('Error creating company table:', error);
  });


Company.hasMany(Offer, { foreignKey: 'company_id' });

sequelize.sync()
  .then(() => {
    console.log('Entreprise table created successfully.');
  })
  .catch((error) => {
    console.log('Error creating Entreprise table:', error);
  });

module.exports = Company;
