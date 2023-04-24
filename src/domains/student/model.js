const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Review = require('../reviews/model');

const Student = sequelize.define('students', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: true
  },
  LastName:{
    type: Sequelize.STRING,
    allowNull: true

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
    allowNull: false
  },
  role: {
    type: Sequelize.ENUM('student', 'company'),
    allowNull: false
  },
  resetPasswordToken: {
    type: Sequelize.STRING,
    allowNull: true
  },
  resetPasswordExpires: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  file: {
    type: Sequelize.STRING,
    allowNull: true
  },
  Number: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  streetAdress: {
    type: Sequelize.STRING,
    allowNull: true
  },
  city: {
    type: Sequelize.STRING,
    allowNull: true
  },
  state: {
    type: Sequelize.STRING,
    allowNull: true
  },
  Postal: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  place: {
    type: Sequelize.STRING,
    allowNull: true
  },
  skills: {
    type: Sequelize.STRING,
    allowNull: true
  },
  schoolname: {
    type: Sequelize.STRING,
    allowNull: true
  },
  schoollocation: {
    type: Sequelize.STRING,
    allowNull: true
  },
  firstattend: {
    type: DataTypes.DATE,
    allowNull: true
  },
  finalattend: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: Sequelize.ENUM('active', 'notactive'),
    defaultValue: 'notactive'
  }
}, {
  timestamps: false
});

// Define the relationship after defining both models
Student.hasMany(Review, { as: 'studentReviews' });

sequelize.sync({ force: true }).then(() => {
  console.log('Tables created successfully');
}).catch((err) => {
  console.error('Unable to create tables:', err);
});

module.exports = Student;
