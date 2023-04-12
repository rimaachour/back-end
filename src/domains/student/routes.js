const express = require("express");
const PDFDocument = require("pdfkit");
const mysql = require("mysql2");
const Pdfmake = require('pdfmake');
const mysqlPormise = require('mysql2/promise') // you import this package when you want to use execute function with the connection
const { Sequelize } = require('sequelize');

//const app = express();
const router = express.Router();
const { Router } = require("express");
//const app = require("../..");

//module.exports =  app;
///version with sequelize

const studentController = require('../student/controller.js')

router.post('/createStudent',studentController.registerUser)

router.get('/AllStudents',studentController.getAllStudents)

router.get('/:nom',studentController.getStudentByName)

router.put('/:id',studentController.updateStudentById)

router.delete('/:id',studentController.deleteStudentById)
router.post('/verifyOTP',studentController.verifyOTP)

//router.get('/PublishedStudent',studentController.getPublishedStudent)


module.exports = router;
    
    
    
    
    
    
    
    
    
      












