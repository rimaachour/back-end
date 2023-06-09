const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Student = require('../student/model');
const company = require('../entreprise/model')
const notification = sequelize.define('notification',{

id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},

    studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    companyId:{
        type: Sequelize.INTEGER,
        allowNull: false,

    },

 message:{type: Sequelize.STRING,
    allowNull: false

 },

}
);

notification.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });
notification.belongsTo(company, { foreignKey: 'companyId', as: 'company' });
sequelize.sync({ force: false }).then(() => {
    console.log('Tables created successfully');
}).catch((err) => {
    console.error('Unable to create tables:', err);
});

module.exports = notification;
