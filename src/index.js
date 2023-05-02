require('dotenv').config();

const dbConnection= require("./config/db");
//const app = require("express")();
const cors = require("cors");
const bodyParser = require('body-parser');
const routes = require("./routes");
const path = require("path");
const express = require('express');
const app = express();

const authRoutes = require('./domains/auth/routes');

//databaseConnection
dbConnection.authenticate()
.then(()=>{
  console.log("connection has been established Successfully");
}).catch((err)=>console.error("unable to connect database",err))


//cors
app.use(cors());
//use public folder to serve web pages



//for accepting posts from data

app.use(express.json());
app.use(express.urlencoded());
app.use((req,res,next)=>{
  res.setHeader('Access-control-allow-origin','*');
  res.setHeader('Access-control-allow-Methods','GET,POST,PUT,DELETE');
  res.setHeader('Access-control-allow-Methods','Content-Type, Authorization');
  next();



});
//app.use('/register',authRoutes);







//app.use(bodyParser.urlencoded({
  //extended:true
//}));


//registering routes
//app.get('/', function (req, res) {
 // res.send('Hello World!'); // This will serve your request to '/'.
//});
app.use(routes);


//api routes 

app.post('/register', (req, res) => {
  const { Name, Email, Password, ConfirmPassword, Role } = req.body;
  // faire quelque chose avec les données d'inscription
  res.send('Inscription réussie');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: false, message: err.message });
});


//server 
app.listen(5000, () => {
  console.log("server running on port 5000");
});


module.exports = app;