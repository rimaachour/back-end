const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
//const Domain = require('../domain/model')
const filiere = sequelize.define('fields', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    domain_id:{
       type: Sequelize.INTEGER,

    },
  }, {
    
    timestamps: false
  });
  
sequelize.sync({ force: true }).then(() => {
    console.log('Tables created successfully');
  }).catch((err) => {
    console.error('Unable to create tables:', err);
  });
  
  //filiere.belongsTo(Domain, {foreignKey: 'domain_id' });
module.export =filiere