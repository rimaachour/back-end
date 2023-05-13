const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Student = require('../student/model')

const Skill = sequelize.define('Skill', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
   
  });
  
 
  // Student.belongsToMany(Skill, {
  //   through: {
  //     model: 'StudentSkill',
  //     unique: false,
  //     timestamps: false,
  //     // Add the `percentage` attribute to the join table
  //     // by specifying it as a column in the `StudentSkill` model
  //     // and passing it to the `through` option
  //     attributes: {
  //       include: ['percentage']
  //     }
  //   },
  //   // Use the alias `skills` for the `Skill` model
  //   as: 'skills'
  // });

  sequelize.sync({ force: false }).then(() => {
  console.log('Tables created successfully');
}).catch((err) => {
  console.error('Unable to create tables:', err);
});
module.exports = Skill;
