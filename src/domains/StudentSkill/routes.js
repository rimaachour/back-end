const express = require('express');
const router = express.Router();
const StudentskillController = require('../StudentSkill/controller');
const authentication = require('../../middleware/authentication');

router.get('/getMySkills', authentication, StudentskillController.getAllStudentSkills);
router.post('/addskill',authentication,StudentskillController.addStudentSkill);
router.put('/deleteskills',authentication,StudentskillController.deleteStudentSkillById);
router.put('/updateskill',authentication,StudentskillController.updatePercentageById);
router.get('/getMySkillsById/:id', authentication, StudentskillController.getSkillsByStudentId);


module.exports = router;
