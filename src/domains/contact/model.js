const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Contact = sequelize.define('contact', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    name:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName:
    {
        type: Sequelize.STRING,
        allowNull: false
    },


    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    subject: {
        type: Sequelize.STRING,
        allowNull: false
    },
    message: {
        type:
            Sequelize.TEXT,
        allowNull: false
    },
});
sequelize.sync({ force:false }).then(() => {
    console.log('Tables created successfully');
  }).catch((err) => {
    console.error('Unable to create tables:', err);
  });


  module.exports = Contact;