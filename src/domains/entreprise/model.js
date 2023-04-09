const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require("../../config/db");
const CV = require("../CV/model")


const Entreprise = sequelize.define('entreprise', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  confirmpassword: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('student', 'company'),
    allowNull: false
  }
}, {
  timestamps: false
});

    
module.exports = Entreprise;
