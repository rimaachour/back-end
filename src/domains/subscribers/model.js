const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Student = require('../student/model');
const Company = require('../entreprise/model');

const Subscriber = sequelize.define('subscribers', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
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
 
  companyId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
        model: 'companies' , // Wrote it hardcoded due to circular dependencies causing it to be empty object
        //TODO fix circular deps
        key: 'id'
  },}
});

Subscriber.associate = () => {
  Subscriber.belongsTo(Student, { foreignKey: 'studentId' });
  Subscriber.belongsTo(Company, { foreignKey: 'companyId' });
};

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Tables created successfully');
  })
  .catch((err) => {
    console.error('Unable to create tables:', err);
  });

module.exports = Subscriber;