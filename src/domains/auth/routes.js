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


router.post('/forgetpassword',UserController.forgotPassword)
router.post('/restePassword/:token',UserController.restePassword)
router.post('/forgetpasswordCompany',UserController.forgotPasswordCompny)
router.post('/restePasswordCompny/:token',UserController.resetPasswordCompany)

router.post("/login", async (req, res) => {
    await UserController.signIn(req, res);
});

router.post("/login1", async (req, res) => {
    await UserController.signInCompany(req, res);
});

module.exports = router;
