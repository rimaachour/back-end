const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Review = require('../reviews/model');
const Offer = require('../offer/model')

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
  service1:{
    type: Sequelize.STRING,
    allowNull: true,
  },
  service2:{
    type: Sequelize.STRING,
    allowNull: true,
  },
  service3:{
    type: Sequelize.STRING,
    allowNull: true,
  },
  service4:{
    type: Sequelize.STRING,
    allowNull: true,
  },
  location:{
    type: Sequelize.STRING,
    allowNull: true,
  },
  Mobile:{
    type: Sequelize.STRING,
    allowNull: true,
  }
}, {
  timestamps: false,
});

    Company.hasMany(Offer, { as: 'companyId'});

// Offer.belongsTo(Company, { foreignKey: 'companyId' });
// Company.hasMany(Review, { as: 'CompanyReviews' });

sequelize.sync({ force: false }).then(() => {
  console.log('Tables created successfully');
}).catch((err) => {
  console.error('Unable to create tables:', err);
});

module.exports = Company ;
