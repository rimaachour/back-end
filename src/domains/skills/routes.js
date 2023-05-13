const express = require('express');
const router = express.Router();
const skillController = require('../skills/controller');
const authentication = require('../../middleware/authentication');

router.post('/addSkills',authentication,skillController.addSkill);
router.put('/modifySkill/:id',authentication,skillController.modifySkill);
router.delete('/deleteSkill/:id',authentication,skillController.deleteSkill);
router.get('/',authentication,skillController.getSkills);


module.exports = router;