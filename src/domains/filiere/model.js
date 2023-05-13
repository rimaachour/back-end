// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../../config/db');
// const Domain = require('../domain/model');


// const Filiere = sequelize.define('filiere', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//     unique: true,
//   },
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   domainId:{
//     type:Sequelize.INTEGER,
//     allowNull:false
//   }
// }, {

//   timestamps: false
// });



// Filiere.belongsTo(Domain);


// sequelize.sync({ force: false }).then(() => {
//   console.log('Tables created successfully');
// }).catch((err) => {
//   console.error('Unable to create tables:', err);
// });



