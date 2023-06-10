const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Student = require('../student/model');
const Skill = require('../skills/model')

const StudentSkill =  sequelize.define('StudentSkill', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
    percentage: {
        type: DataTypes.STRING,
        allowNull: false
      },
      studentId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'students', // Wrote it hardcoded due to circular dependencies causing it to be empty object
          //TODO fix circular deps
          key: 'id'
        }
      },
      
     

      skillId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: Skill, // 'Actors' would also work
          key: 'id'
        }
      }
    }, {
   
      tablelName: 'StudentSkill'
    });


     StudentSkill.associate  = () =>{
  
      Student.hasMany(StudentSkill, { foreignKey: 'studentId', as: 'StudentSkill' });
      StudentSkill.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });
      Skill.hasMany(StudentSkill ,{ foreignKey: 'skillId', as: 'StudentSkill' });
      StudentSkill.belongsTo(Skill, { foreignKey: 'studentId', as: 'student' });

    
     }


    sequelize.sync({ force: false }).then(() => {
      console.log('Tables created successfully');
    }).catch((err) => {
      console.error('Unable to create tables:', err);
    });
    module.exports = StudentSkill;
