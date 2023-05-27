const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const domainOffer = sequelize.define('domainOffer',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
      },
},{
    timestamps: false
});


sequelize.sync({ force: false}).then(() => {
  console.log('Tables created successfully');
}).catch((err) => {
  console.error('Unable to create tables:', err);
});





module.exports = domainOffer