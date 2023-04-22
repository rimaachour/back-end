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

const entrepriseController = require('../entreprise/controller.js');
const Student = require("../student/model.js");

router.post('/registerCompany',entrepriseController.registerCompany)

router.get('/getAllEntreprise',entrepriseController.getAllEntreprise)



router.put('/:id',entrepriseController.updateEntrepriseById)

router.delete('/:id',entrepriseController.deleteEntrepriseById)
router.post('/verifyOTP1',entrepriseController.verifyOTP1)
router.put('/updateCompny/:id',entrepriseController.updateCompny)
//router.get('/searchStudentBySkills',entrepriseController.searchStudentBySkills)
//
router.get('/search',async (req, res, next) => {
// open database  
    try {
        const { skills } = req.query;
      const students = await Student.findAll({
        where: {
          skills:skills
        }
      });
  
      return res.status(200).send(students);
    } catch (err) {
      return next(err.message);
    }
  })

  router.get('/:nom',entrepriseController.getEntrepriseByName)
//router.post('/createcv', createCV)

//router.get('/PublishedStudent',studentController.getPublishedStudent)


module.exports = router;
    
    
    
    
    
    
    
    
    
      












