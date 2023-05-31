const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const student = require('../student/model')
const experience = sequelize.define('experience', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    DateExperience: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    TitreExperience: {
        type: Sequelize.STRING,
        allowNull: true,

    },
    PlaceExperience: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    descriptionExperience: {
        type: Sequelize.STRING,
        allowNull: true,
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

experience.associate = () => {

    experience.belongsTo(student);
    student.hasMany(experience);
}

sequelize.sync({ force: false }).then(() => {
    console.log('Tables created successfully');
}).catch((err) => {
    console.error('Unable to create tables:', err);
});

module.exports = experience;