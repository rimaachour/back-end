const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Review = require('../reviews/model');
const Skill = require('../skills/model');
const preference=require('../preference/model');
const StudentSkill = require ('../StudentSkill/model')
const Domain = require('../domain/model');
const company = require('../entreprise/model')
const { compareSync } = require('bcrypt');
const Company = require('../entreprise/model');
const Filiere =require('../filiere/model');

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
    allowNull: true,
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
 
  skills: {
    type: Sequelize.STRING,
    allowNull: true
  },
  schoolname: {
    type: Sequelize.STRING,
    allowNull: true
  },
  LinkedIn:{
    type: Sequelize.STRING,
      allowNull: true
  
   },
 Fb:{
  type: Sequelize.STRING,
    allowNull: true

 },
 GitHub:{
  type: Sequelize.STRING,
    allowNull: true

 },
 WhatsApp:{
  type: Sequelize.STRING,
    allowNull: true

 },
 bio : {
  type: Sequelize.STRING,
    allowNull: true

 },
  status: {
    type: Sequelize.ENUM('active', 'notactive'),
    defaultValue: 'notactive'
  }
}, {
  timestamps: false
});


Skill.belongsToMany(Student, { through:'StudentSkill'});
Student.belongsToMany(Skill, { through:'StudentSkill'});

//Domain.belongsToMany(Student, { through:'preference'});
//  Filiere.belongsToMany(Student)





//  Student.hasMany(preference);


// Define associations between the models
// Student.hasMany(Domain);
// Domain.belongsTo(Student);



// Define the relationship after defining both models
 //Student.belongsToMany(Review, { as: 'studentReviews' });



Student.belongsToMany(Company, { through: 'reviews' });
Company.belongsToMany(Student, { through: 'reviews' });

sequelize.sync({ force: false }).then(() => {
  console.log('Tables created successfully');
}).catch((err) => {
  console.error('Unable to create tables:', err);
});

module.exports = Student;
