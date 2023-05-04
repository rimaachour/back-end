const dbConnection = require("./config/db");
const cors = require("cors");
const routes = require("./routes");
const express = require('express');
const app = express();

//databaseConnection
dbConnection.authenticate()
  .then(() => {
    console.log("connection has been established Successfully");
  }).catch((err) => console.error("unable to connect database", err))


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