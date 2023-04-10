const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require("../../config/db");

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
  }
}, {
  timestamps: false
});

sequelize.sync()
  .then(() => {
    console.log('Company table created successfully.');
  })
  .catch((error) => {
    console.log('Error creating company table:', error);
  });

module.exports = Company;
