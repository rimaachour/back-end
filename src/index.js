const dbConnection = require("./config/db");
const cors = require("cors");
const routes = require("./routes");
const express = require('express');
const app = express();
const Admin = require("./domains/admin/model");
const Student = require("./domains/student/model")
const preference = require("./domains/preference/model")
 async function addAdmin(){
  const admin = await Admin.findOne({ where: { email:'admin@gmail.com' } })
  if(!admin){
    Admin.create({
      email:"admin@gmail.com",
      password:"123456789",
      
    })
    console.log("admin a été ajoute");
  }
 }



//databaseConnection
dbConnection.authenticate()

  .then(() => {
    console.log("connection has been established Successfully");
  })
  .then(()=>{
    //addAdmin()
  })
  .catch((err) => console.error("unable to connect database", err))


//cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use(routes);


app.use((err, req, res, next) => {
  res.status(500).json({ status: false, message: err.message });
});


//server 
app.listen(5000, () => {
  console.log("server running on port 5000");
});
Student.hasMany(preference);