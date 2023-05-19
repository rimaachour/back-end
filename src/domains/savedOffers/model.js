const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Student = require("../student/model");
const Offer = require ("../offer/model");
const SavedOffer = sequelize.define('saved_offers', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    studentId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    offerId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false
  });
  sequelize.sync({ force: true }).then(() => {
    console.log('Tables created successfully');
  }).catch((err) => {
    console.error('Unable to create tables:', err);
  });
  
  
  // Define associations between models if necessary
  SavedOffer.belongsTo(Student, { foreignKey: 'studentId' });
  SavedOffer.belongsTo(Offer, { foreignKey: 'offerId' });


  module.exports = SavedOffer;