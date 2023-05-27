const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Company = require('../entreprise/model');
const Domain = require('../domain/model');
const location = require('../loaction/model')
const Time = require('../Time/model');
const domainOffer = require('../domainOffer/model');
const Offer = sequelize.define('offers', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  technology: {
    type: Sequelize.STRING,
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false
  },

  internship_level: {
    type: Sequelize.STRING,
    allowNull: false
  },
  duration: {
    type: Sequelize.STRING,
    allowNull: false
  },


  company_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  companyId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Company, // 'Actors' would also work
      key: 'id'
    }
  },
  domainOfferId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: domainOffer, // 'Actors' would also work
      key: 'id'
    }
  },

  locationId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: location, // 'Actors' would also work
      key: 'id'
    }
  },
  TimeId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Time, // 'Actors' would also work
      key: 'id'
    }
  },


  status: {
    type: Sequelize.ENUM('active', 'inactive'),
    allowNull: false,
    defaultValue: 'active'
  },
  popular: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },


}, {
  timestamps: false
});

Offer.associate = (models) => {
  Company.hasMany(Offer);
  Offer.belongsTo(Company);
  location.hasMany(Offer);
  Offer.belongsTo(location);
  Time.hasMany(Offer);
  Offer.belongsTo(Time);
  domainOffer.hasMany(Offer);
  Offer.belongsTo(domainOffer);

};

sequelize.sync({ force: false })
  .then(() => {
    console.log('Offer table created successfully.');
  })
  .catch((error) => {
    console.log('Error creating Offer table:', error);
  });

module.exports = Offer;
