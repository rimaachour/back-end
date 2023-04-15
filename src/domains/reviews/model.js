const { Sequelize, DataTypes } = require('sequelize');
const sequelize  = require("../../config/db");

const CV = sequelize.define('reviews', {
id :{
    type:INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true

},
review : {
    type:String,
    allowNull:false,

},
rating :{
    
}
})