const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Offer = require('../offer/model');
const student = require('../student/model')
const favorisOffers = sequelize.define('favorisOffers', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  offerId: {
    type: DataTypes.INTEGER, // Corrected data type
    allowNull: false,
    references: {
      model: Offer,
      key: 'id'
    }
  },
  studentId:{
    type: DataTypes.INTEGER, // Corrected data type
    allowNull: false,
    references: {
      model: student,
      key: 'id'
  }}
});

favorisOffers.belongsTo(Offer, { foreignKey: 'offerId' });
favorisOffers.belongsTo(student,{foreignKey:'studentId'})

sequelize.sync({ force: false }).then(() => {
  console.log('Tables created successfully');
}).catch((err) => {
  console.error('Unable to create tables:', err);
});

module.exports = favorisOffers;
