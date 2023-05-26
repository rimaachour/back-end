const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const {Filiere} = require("../domain/model");
const Student = require("../student/model");

const Preference = sequelize.define('pref', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    filiereID: {
        type: Sequelize.INTEGER,
        references: {
            model: Filiere,
            key: 'id'
        }
    },
    studentID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'students', // Wrote it hardcoded due to circular dependencies causing it to be empty object
            //TODO fix circular deps
            key: 'id'
        }
    }
  }, {
    //tableName: 'pref',
    timestamps: false
  });

Preference.associate = (models) => {
    Preference.hasMany(Filiere);
    Preference.hasMany(Student);
    Filiere.belongsTo(Preference)
    Student.belongsTo(Preference)

};
// preference.belongsTo(User, {as: 'User', foreignKey: 'UserID'});

sequelize.sync({ force: false }).then(() => {
  console.log('Tables created successfully');
}).catch((err) => {
  console.error('Unable to create tables:', err);
});


  module.exports = Preference;
