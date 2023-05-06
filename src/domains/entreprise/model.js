const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const offer = require('../offer/model')
const Review = require('../reviews/model');
const Student = require ('../student/model')
//const OTP = require('../OTP/model')
const Company = sequelize.define('companies', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6],
        msg: 'Password must be at least 6 characters'
      }
    }
  }
  ,
  confirmpassword: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6],
        msg: 'Password must be at least 6 characters'
      }
    }
  },
  OTP: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  role: {
    type: Sequelize.ENUM('student', 'company'),
    allowNull: false,
  },
  resetPasswordToken: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  resetPasswordExpires: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  domain: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  logo: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false
  },

  
}, {
  timestamps: false,
});


Company.hasMany(Review, { as: 'CompanyReviews' });
//Company.hasMany(OTP, { foreignKey: 'companyId' });
//OTP.belongsTo(Company, { foreignKey: 'companyId' });


module.exports = Company;



