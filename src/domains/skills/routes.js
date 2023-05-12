const express = require('express');
const router = express.Router();
const skillController = require('../skills/controller');
//const authentication = require('../../middleware/authentication');

router.post('/addSkills',skillController.addSkill);
router.put('/modifySkill/:id',skillController.modifySkill);
router.delete('/deleteSkill/:id',skillController.deleteSkill);
router.get('/',skillController.getSkills);


module.exports = router;