const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require("../../config/db");
const Student = require("../student/model");
const Entreprise =require("../entreprise/model")

const CV = sequelize.define('cv', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telephone: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    education: {
      type: DataTypes.STRING,
      allowNull: false
    },
    experience: {
      type: DataTypes.STRING,
      allowNull: false
    },
    competences: {
      type: DataTypes.STRING,
      allowNull: false
    },
    projets: {
      type: DataTypes.STRING,
      allowNull: false
    },
    informationPersonnelle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    compagny_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Entreprise,
        key: 'id'
      }
    },
    student_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Student,
        key: 'id'
      }
    }
  }, {
    timestamps: false
  });
  // Define associations
  CV.belongsTo(Student, { foreignKey: 'student_id', as: 'student' });
  CV.belongsTo(Entreprise, { foreignKey: 'compagny_id', as: 'compagny' });
  
  Student.hasOne(CV, { foreignKey: 'student_id', as: 'cv' });
  Entreprise.hasOne(CV, { foreignKey: 'compagny_id', as: 'cv' });
   
module.exports = CV;

