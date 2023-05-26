const express = require('express');
const router = express.Router();
const authentication = require("../../middleware/authentication.js");
const favorisController=require("../favoriteProfiles/controller")
router.post('/favorisProfile',authentication, favorisController.ProfilesSaved)
module.exports = router;