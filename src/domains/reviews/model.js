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
 
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  companyId: {
    type: Sequelize.INTEGER,
    references: {
      model: Company,
      key: 'id'
    }
  },
  studentId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'students', // Wrote it hardcoded due to circular dependencies causing it to be empty object
      //TODO fix circular deps
      key: 'id'
    }
  },
  reviewer: {
    type: DataTypes.ENUM('student', 'company'),
    allowNull: false
  }
 
},{
  timestamps: false
});

Review.associate = (models) => {
  Review.belongsTo(Student, { foreignKey: 'studentId' });
Review.belongsTo(Company, { foreignKey: 'companyId' })

};

sequelize.sync({ force: false }).then(() => {
  console.log('Tables created successfully');
}).catch((err) => {
  console.error('Unable to create tables:', err);
});

module.exports = Review;