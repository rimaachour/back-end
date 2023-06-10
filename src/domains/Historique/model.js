const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Student = require('../student/model');
const Offer = require('../offer/model');
const company = require('../entreprise/model')

const Historique = sequelize.define('Historique', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    offerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending',
        validate: {
          isIn: [['pending', 'accepted', 'refused']],
        },
      },
      
});

Student.hasMany(Historique, { foreignKey: 'studentId', as: 'historiques' });
Offer.hasMany(Historique, { foreignKey: 'offerId', as: 'historiques' });
company.hasMany(Historique, { foreignKey: 'companyId', as: 'historiques' });
Historique.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });
Historique.belongsTo(Offer, { foreignKey: 'offerId', as: 'offer' });
Historique.belongsTo(company, { foreignKey: 'companyId', as: 'company' });

sequelize.sync({ force: false }).then(() => {
    console.log('Tables created successfully');
}).catch((err) => {
    console.error('Unable to create tables:', err);
});

module.exports = Historique;
