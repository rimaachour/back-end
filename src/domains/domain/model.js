const { Sequelize, DataTypes, HasMany } = require('sequelize');
const sequelize = require('../../config/db');

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
    allowNull:false
  }
}, {

  timestamps: false
});
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

// Synchronize the model with the database and create the domains table if it doesn't exist

Domain.hasMany(Filiere);

sequelize.sync({ force: false }).then(() => {
  console.log('Tables created successfully');
}).catch((err) => {
  console.error('Unable to create tables:', err);
});


















module.exports = Domain,
Filiere
