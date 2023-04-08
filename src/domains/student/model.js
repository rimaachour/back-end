const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require("../../config/db");

const Student = sequelize.define('students', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  name: {
    type:DataTypes.STRING,
    allowNull:false
  },

  email:{type:DataTypes.STRING,
  allowNull:false},

  password:{ type:DataTypes.STRING,
  allowNull:false},
  confirmpassword:{ type:DataTypes.STRING,
    allowNull:false,
  },
  OTP:{type:DataTypes.INTEGER,
    allowNull:false,},

  role:{type:DataTypes.ENUM('student', 'company'),
    allowNull:false},

    resetPasswordToken:{type:DataTypes.STRING,allowNull:true},


    resetPasswordExpires:{type:DataTypes.NUMBER,allowNull:true}

   
 
  },{
  timestamps: false // Option pour désactiver les timestamps
});

 
 


module.exports = Student;
