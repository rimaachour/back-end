const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require("../../config/db");
const { v4: uuidv4 } = require('uuid');

const Entreprise = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      Name: {
        type:DataTypes.STRING,
        allowNull:false
      },
    
      Email:{type:DataTypes.STRING,
      allowNull:false},
    
      Password:{ type:DataTypes.STRING,
      allowNull:false},
      ConfirmPassword:{ type:DataTypes.STRING,
        allowNull:false,
      },
      Role:{type:DataTypes.ENUM('student', 'company'),
        allowNull:false},
       
     
    },{
      timestamps: false // Option pour désactiver les timestamps
    });
    
module.exports = Entreprise;
