const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const {Domain} = require("../domain/model");
const Skill = require("../skills/model");
const Student = require("../student/model");

console.log('---------man', Domain, Student)

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
    domainID: {
        type: Sequelize.INTEGER,
        references: {
            model: Domain,
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
    Preference.hasMany(Domain);
    Preference.hasMany(Student);
    Domain.belongsTo(Preference)
    Student.belongsTo(Preference)

};
// preference.belongsTo(User, {as: 'User', foreignKey: 'UserID'});

sequelize.sync({ force: false }).then(() => {
  console.log('Tables created successfully');
}).catch((err) => {
  console.error('Unable to create tables:', err);
});


console.log('---------man', Preference)
module.exports = Preference;
