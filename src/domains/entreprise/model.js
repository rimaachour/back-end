const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const offer = require('../offer/model')
const Review = require('../reviews/model');
const Student = require ('../student/model')

const Company = sequelize.define('companies', {
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
    unique: true,

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
    allowNull: true,
  },
  domain: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  logo: {
    type: Sequelize.STRING,
    allowNull: true,
  },
}, {
  timestamps: false,
});


Company.hasMany(Review, { as: 'CompanyReviews' });

module.exports = Company;



