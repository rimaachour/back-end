const { Sequelize, DataTypes, HasMany } = require('sequelize');
const sequelize = require('../../config/db');
const preference = require('../student/model')
const Domain = sequelize.define('domains',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,

  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  
}, {

  timestamps: false
});

const Filiere = sequelize.define('filiere', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  domainId:{
    type:Sequelize.INTEGER,
    allowNull:false,
    references: {
      model: Domain, // 'Actors' would also work
      key: 'id'
    }
  }
}, {

  timestamps: false
});

// Domain.hasMany(preference);

// Synchronize the model with the database and create the domains table if it doesn't exist


  Domain.hasMany(Filiere);
Filiere.belongsTo(Domain);



sequelize.sync({ force: false }).then(() => {
  console.log('Tables created successfully');
}).catch((err) => {
  console.error('Unable to create tables:', err);
});


















module.exports = {Domain,
Filiere}
