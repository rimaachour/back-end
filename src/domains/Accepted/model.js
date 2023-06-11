const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Student = require('../student/model');
const Offer = require('../offer/model');

const Accepted = sequelize.define(
  'Accepted',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    studentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    offerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { tableName: 'Accepted' }
);

// Establish the relationships between tables
Accepted.belongsTo(Student, { foreignKey: 'studentId' });
Accepted.belongsTo(Offer, { foreignKey: 'offerId' });

module.exports = Accepted;