const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const company = require ('../entreprise/model');
const Student = require ('../student/model')
const Favoris = sequelize.define('favoris', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
          companyId:{
            type:Sequelize.INTEGER,
            allowNull:false,
            references: {
              model: company, // 'Actors' would also work
              key: 'id'
            }
          }

    });
    
sequelize.sync({ force:false }).then(() => {
    console.log('Tables created successfully');
  }).catch((err) => {
    console.error('Unable to create tables:', err);
  });

  


  module.exports = Favoris;