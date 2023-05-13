const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require("../../config/db");

const Admin = sequelize.define('Admins', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
 

  
  email: {type:Sequelize.STRING,
    allowNull: false,

  },
  password:{ type: Sequelize.STRING,
    allowNull: false,
  },
  
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'admin'
  
  }
  //image: Sequelize.STRING
}, {
  timestamps: false // Option pour désactiver les timestamps
});

 
 


module.exports = Admin;
