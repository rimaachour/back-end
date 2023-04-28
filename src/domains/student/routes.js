const express = require("express");
const PDFDocument = require("pdfkit");
const mysql = require("mysql2");
const Pdfmake = require('pdfmake');
const mysqlPormise = require('mysql2/promise') // you import this package when you want to use execute function with the connection
const { Sequelize } = require('sequelize');
const authentication = require('../../middleware/authentication');

//const app = express();
const router = express.Router();
const { Router } = require("express");

//const searchoffer = require('../student/controller')
//const app = require("../..");

//module.exports =  app; 
///version with sequelize

const studentController = require('../student/controller.js');
const Student = require("./model");


router.post('/createStudent',studentController.registerUser)

router.get('/AllStudents',authentication , studentController.getAllStudents)

router.get('/:nom',authentication,studentController.getStudentByName)

//router.put('update/:id',studentController.updateStudentById)

router.delete('/:id',authentication,studentController.deleteStudentById)
router.post('/verifyOTP',studentController.verifyOTP)
router.put('/updateUser/:id',authentication,studentController.updateUser)
router.get('/searchoffers',authentication, studentController.searchOffer);


//router.get('/PublishedStudent',studentController.getPublishedStudent)


module.exports = router;
    
    
    
    
    
    
    
    
    
      












