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
const Favoris = require('../favoriteProfiles/model')

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
  // // schoolname: {
  // //   type: Sequelize.STRING,
  // //   allowNull: true
  // },
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
    defaultValue: 'active'
  },
studyEstablishment: {
    type:  Sequelize.STRING,
    allowNull: true
  },
  studyfield:{
    type:  Sequelize.STRING,
    allowNull: true
  },
  popular: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  DateExperience:{
type:Sequelize.STRING,
allowNull: true,
  },
  TitreExperience:{
    type:Sequelize.STRING,
    allowNull: true,

  },
  PlaceExperience:{
    type:Sequelize.STRING,
    allowNull: true,
},
  descriptionExperience:{
    type:Sequelize.STRING,
    allowNull: true,
  },
  projectName:{
    type:Sequelize.STRING,
    allowNull: true,
  },
  startDate:{
    type:Sequelize.STRING,
    allowNull: true,

  },
  finDate:{
    type:Sequelize.STRING,
    allowNull:true,
  },
projectStatus:{
  type:Sequelize.STRING,
  allowNull:true,
}

}, {
  timestamps: false
});

Student.associate = () => {
Skill.belongsToMany(Student, { through:StudentSkill});
Domain.belongsToMany(Student, { through:preference});
Company.belongsToMany(Student, { through: Profiles });
//  Filiere.belongsToMany(Student)




// Student.hasMany(preference);
// preference.belongsTo(Student);

// Define associations between the models
// Student.hasMany(Domain);
// Domain.belongsTo(Student);



// Define the relationship after defining both models
 //Student.belongsToMany(Review, { as: 'studentReviews' });
 Student.belongsToMany(Company, { through: 'reviews' });
 Company.belongsToMany(Student, { through: 'reviews' });

};
Favoris.belongsTo(Student,{foreignKey:'studentId'})
sequelize.sync({ force: false }).then(() => {
  console.log('Tables created successfully');
}).catch((err) => {
  console.error('Unable to create tables:', err);
});

module.exports = Student;
