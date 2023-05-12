const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const StudentSkill =  sequelize.define('StudentSkill', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
    percentage: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,
      tablelName: 'StudentSkill'
    });
    module.exports = StudentSkill;
