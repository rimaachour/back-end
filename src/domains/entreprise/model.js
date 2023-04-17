const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const offer = require('../offer/model')

const Company = sequelize.define('company', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  confirmpassword: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  OTP: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  role: {
    type: Sequelize.ENUM('student', 'company'),
    allowNull: false,
  },
  resetPasswordToken: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  resetPasswordExpires: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  domain: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  logo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});
Company.hasMany(offer, { foreignKey: 'company_id' });

module.exports = Company;
