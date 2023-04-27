const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Company = require('../entreprise/model')
const OTP = sequelize.define('otp', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },

    otp_value: {
        type: Sequelize.STRING,
        allowNull: false
      },


      user_role: {
        type: Sequelize.STRING,
        allowNull: false
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      companyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'companies',
          key: 'id'
        }
      }


    });




module.exports = OTP;
