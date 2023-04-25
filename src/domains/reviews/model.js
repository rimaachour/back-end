const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const { Student } = require('../student/model');

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

/*entrepriseId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  studentId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Student,
      key: 'id',
    },
  },*/



},{
  timestamps: false
});


sequelize.sync({ force: true }).then(() => {
  console.log('Tables created successfully');
}).catch((err) => {
  console.error('Unable to create tables:', err);
});

module.exports = Review;
