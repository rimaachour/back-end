const express = require('express');
const router = express.Router();
const StudentskillController = require('../StudentSkill/controller');
const authentication = require('../../middleware/authentication');
const authentication = require('../../middleware/authentication');

router.post('/addskill',authentication,StudentskillController.addStudentSkill);
router.put('/updateskill',authentication,StudentskillController.updatePercentageById);
router.put('/updateskill',authentication,StudentskillController.updatePercentageById);

