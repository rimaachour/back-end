const dbConnection = require("./config/db");
const cors = require("cors");
const routes = require("./routes");
const express = require('express');
const app = express();
const Admin = require("./domains/admin/model");
async function addAdmin() {
  const admin = await Admin.findOne({ where: { email: 'admin@gmail.com' } })
  if (!admin) {
    Admin.create({
      email: "admin@gmail.com",
      password: "123456789",
      
    })
    console.log("admin a été ajoute");
  }
 }

const server = require('http').createServer(app);
const socketIO = require('socket.io');
const io = socketIO(server);

global.io = io;

      // Envoyer une notification à l'entreprise (par exemple, un e-mail)
      // Utilisez la méthode appropriée pour envoyer une notification à l'entreprise
  
      // Set up Socket.IO server

  
      global?.io.on('connection', (socket) => {
        // Handle socket connection events
        // data => company | student id;
        socket.on('join', (data) =>{
          console.log('user has been joined room => ', data);
          socket.join(data);
        })
      });
  
      


//databaseConnection
dbConnection.authenticate()

  .then(() => {
    console.log("connection has been established Successfully");
  })
  .then(() => {
   addAdmin()
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
server.listen(5000, () => {
  console.log("server running on port 5000");
});