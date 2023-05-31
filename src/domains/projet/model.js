const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const student = require('../student/model')
const project = sequelize.define('project', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    },
    studentId: {
     type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'students', // Wrote it hardcoded due to circular dependencies causing it to be empty object
         //TODO fix circular deps
             key: 'id'
        }
    },
});
 project.associate =() =>{
     project.belongsTo(student);

     student.hasMany(project);
 }

sequelize.sync({ force: false }).then(() => {
    console.log('Tables created successfully');
}).catch((err) => {
    console.error('Unable to create tables:', err);
});

module.exports = project;