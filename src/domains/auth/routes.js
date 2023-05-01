const express = require("express");
const PDFDocument = require("pdfkit");
const multer = require('multer');
const mysql = require("mysql2");
const Pdfmake = require('pdfmake');
const mysqlPormise = require('mysql2/promise') // you import this package when you want to use execute function with the connection
const { Sequelize } = require('sequelize');
const jwt = require("jsonwebtoken");

//const app = express();
const router = express.Router();
const { Router } = require("express");
//const app = require("../..");


//module.exports =  app;
///version with sequelize


const UserController = require("../auth/controller.js")

//for sign in 
router.post('/forgotPasswordStudent',UserController.forgotPasswordStudent)
router.post('/verifyOTPStudent',UserController.verifyOTPStudent)
router.post('/resendOtp',UserController.resendOtp)

router.post('/resetPasswordStudent',UserController.resetPasswordStudent)
router.post('/forgetpasswordCompany',UserController.forgotPasswordCompany)
router.post('/verifyOTPCompany',UserController.verifyOTPCompany)
router.post('/resendOtpC',UserController.resendOtpC)

router.post('/restePasswordCompny',UserController.resetPasswordCompany)

router.post("/login", UserController.signInStudent);

router.post("/login1",UserController.signInCompany);
//for signup


module.exports = router;
