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


router.post('/createStudent', studentController.registerUser)

router.get('/AllStudents', studentController.getAllStudents)
router.get('/profile/:id', authentication, async (req, res, next) => {
    try {
        const userpayload = req.local;
        const student = await Student.findOne({
            where: { id: req.params.id },
            attributes: ["id",
                "name",
                "firstname",
                "LastName",
                "email",

                "role",

                "file",
                "Number",
                "streetAdress",
                "city",
                "state",
                "Postal",
                "place",
                "skills",
                "schoolname",
                "schoollocation",
                "firstattend",
                "finalattend",
                "status"]
        });
        if (!student) throw new Error('Invalid user');
        res.json(student)
    } catch (error) {
        next(error);
    }
})
router.get('/:nom', authentication, studentController.getStudentByName)

//router.put('update/:id',studentController.updateStudentById)

router.delete('/:id', studentController.deleteStudentById)
router.post('/verifyOTP', studentController.verifyOTP)
router.put('/updateUser/:id', authentication,studentController.updateUser)
router.get('/searchoffers', authentication,studentController.searchOffer);
router.post('/resendOTPStudent', studentController.resendOtpSRegister);



//router.get('/PublishedStudent',studentController.getPublishedStudent)


module.exports = router;

