const express = require("express");
const PDFDocument = require("pdfkit");
const multer = require('multer');
const mysql = require("mysql2");
const Pdfmake = require('pdfmake');
const mysqlPormise = require('mysql2/promise') // you import this package when you want to use execute function with the connection
const { Sequelize } = require('sequelize');

//const app = express();
const router = express.Router();
const { Router } = require("express");
//const app = require("../..");

const storage = multer.memoryStorage();
//module.exports =  app;
///version with sequelize

const entrepriseController = require('../entreprise/controller.js')

router.post('/registerCompany',entrepriseController.registerCompany)

router.get('/getAllEntreprise',entrepriseController.getAllEntreprise)

router.get('/:nom',entrepriseController.getEntrepriseByName)

router.put('/:id',entrepriseController.updateEntrepriseById)

router.delete('/:id',entrepriseController.deleteEntrepriseById)
router.post('/verifyOTP1',entrepriseController.verifyOTP1)
//router.post('/createcv', createCV)

//router.get('/PublishedStudent',studentController.getPublishedStudent)


module.exports = router;
    
    
    
    
    
    
    
    
    
      












