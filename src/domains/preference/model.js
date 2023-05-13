const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Student = require('../student/model')
const preference = sequelize.define('pref', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
   
  }, {
    //tableName: 'pref',
    timestamps: false
  });
  
Student.hasMany(preference);

sequelize.sync({ force: false }).then(() => {
  console.log('Tables created successfully');
}).catch((err) => {
  console.error('Unable to create tables:', err);
});


  module.exports = preference;
