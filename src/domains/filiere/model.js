const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Domain = require('../domain/model');

const Filiere = sequelize.define('filieres', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  domainId:{
    type:Sequelize.STRING,
    allowNull:false
  }
}, {
  tableName: 'filieres',
  timestamps: false
});
/*
Filiere.belongsTo(Domain, {
  foreignKey: {
    name: 'domainId',
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
*/
Domain.hasMany(Filiere, { as: 'domainId' });
Filiere.belongsTo(Domain, { foreignKey: 'domainId' });
sequelize.sync({ force: false }).then(() => {
  console.log('Tables created successfully');
}).catch((err) => {
  console.error('Unable to create tables:', err);
});

module.exports = Filiere;
