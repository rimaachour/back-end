const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require("../../config/db");

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
    allowNull: false
  },
  LastName:{
    type: Sequelize.STRING,
    allowNull: false

  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  confirmpassword: {
    type: Sequelize.STRING,
    allowNull: false
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
photo: {
  type:Sequelize.STRING,
  allowNull:false

},
Number:{
  type: Sequelize.INTEGER,
  allowNull:false


},
streetAdress:{
  type:Sequelize.STRING,
  allowNull:false
},
city:{
  type:Sequelize.STRING,
  allowNull:false,
},
state:{
  type:Sequelize.STRING,
  allowNull:false,
},
Postal:{
  type:Sequelize.INTEGER,
  allowNull:false,
},
place:{
  type:Sequelize.STRING,
  allowNull:false,
},

schoolname:{
  type:Sequelize.STRING,
  allowNull:false,
},

schoollocation:{
  type:Sequelize.STRING,
  allowNull:false,

},
firstattend:{
  type: DataTypes.DATE,
  allowNull:false,

},

finalattend:{
  type: DataTypes.DATE,
  allowNull:false,

},


status:{type:Sequelize.ENUM('active','notactive'), default:'notactive'}
}, {
  timestamps: false
});
sequelize.sync()
  .then(() => {
    console.log('Students table created successfully.');
  })
  .catch((error) => {
    console.log('Error creating students table:', error);
  });
  

module.exports = Student;
