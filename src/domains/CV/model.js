const { Sequelize, DataTypes } = require('sequelize');
const Student = require('../student/model');
const Entreprise = require('../entreprise/model');
const sequelize = require('../../config/db');

const CV = sequelize.define('cv', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    prenom: {
      type: Sequelize.STRING,
      allowNull: false
    },
    nom: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    telephone: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    education: {
      type: Sequelize.STRING,
      allowNull: false
    },
    experience: {
      type: Sequelize.STRING,
      allowNull: false
    },
    competences: {
      type: Sequelize.STRING,
      allowNull: false
    },
    projets: {
      type: Sequelize.STRING,
      allowNull: false 
    },
    informationPersonnelle: {
      type: Sequelize.STRING,
      allowNull: false
    },
    compagny_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Entreprise,
        key: 'id'
      }
    },
    student_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Student,
        key: 'id'
      },
      allowNull:true
    }
  }, {
    timestamps: false
  });
  
  // Define associations
  CV.belongsTo(Student, { foreignKey: 'student_id', as: 'student' });
  //CV.belongsTo(Entreprise, { foreignKey: 'compagny_id', as: 'compagny' });
  
  Student.hasOne(CV, { foreignKey: 'student_id', as: 'cv' });
  sequelize.sync({ force: true }) // force: true will drop the table if it already exists
  .then(() => {
    console.log('Table(s) created or updated!');
  });
  /* TODO many  */
 // Entreprise.hasOne(CV, { foreignKey: 'compagny_id', as: 'cv' });
  module.exports = CV;
