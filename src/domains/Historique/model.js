const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Student = require('../student/model');
const Offer = require('../offer/model');

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
});

Historique.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });
Historique.belongsTo(Offer, { foreignKey: 'offerId', as: 'relatedOffer' });

sequelize.sync({ force: false }).then(() => {
    console.log('Tables created successfully');
}).catch((err) => {
    console.error('Unable to create tables:', err);
});

module.exports = Historique;
