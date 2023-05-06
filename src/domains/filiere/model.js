const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Domain = require('../domain/model')
const filiere = sequelize.define('fields', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    domain_id:{
       type: DataTypes.INTEGER,

    },
  }, {
    
    timestamps: false
  });
  
  //filiere.belongsTo(Domain, {foreignKey: 'domain_id' });
  // Synchronize the model with the database and create the domains table if it doesn't exist
  sequelize.sync()
  .then(() => {
    console.log('Offer table created successfully.');
  })
  .catch((error) => {
    console.log('Error creating Offer table:', error);
  });
module.export =filiere