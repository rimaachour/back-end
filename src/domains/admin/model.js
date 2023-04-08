const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require("../../config/db");

const Admin = sequelize.define('students', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: Sequelize.STRING,
  prenom: Sequelize.STRING,
  email: Sequelize.STRING,
  specialite: Sequelize.STRING,
  image: Sequelize.STRING
}, {
  timestamps: false // Option pour désactiver les timestamps
});

 
 


module.exports = Student;
