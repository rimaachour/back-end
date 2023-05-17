const express = require('express');
const router = express.Router();
const authentication = require('../../middleware/authentication');

const preferenceController = require('../preference/controller');

router.post("/chooseFiliere",authentication,preferenceController.chooseFiliere)



module.exports = router;
