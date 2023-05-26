const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Student  = require('../student/model');
const {Filiere} = require("../domain/model");
const Company = require("../entreprise/model");
//const Company = require('../entreprise/model')

const Review = sequelize.define('reviews', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  review: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  stars:{
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5,
    },
},
  comment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  companyID: {
    type: Sequelize.INTEGER,
    references: {
      model: Company,
      key: 'id'
    }
  },
  studentID: {
    type: Sequelize.INTEGER,
    references: {
      model: 'students', // Wrote it hardcoded due to circular dependencies causing it to be empty object
      //TODO fix circular deps
      key: 'id'
    }
  }
},{
  timestamps: false
});

Review.associate = (models) => {
  Review.hasOne(Company);
  Review.hasOne(Student);
  Company.belongsTo(Review)
  Student.belongsTo(Review)
};

sequelize.sync({ force: false }).then(() => {
  console.log('Tables created successfully');
}).catch((err) => {
  console.error('Unable to create tables:', err);
});

module.exports = Review;
