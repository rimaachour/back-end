const express = require('express');
const router = express.Router();
const authentication = require("../../middleware/authentication.js");
const favorisController=require("../favoriteProfiles/controller")
router.post('/favorisProfile',authentication, favorisController.ProfilesSaved);
router.get('/getAllFavorisProfile',authentication,favorisController.getAllProfiles);
router.get('/getFavorisProfileById',authentication,favorisController.getAllProfilesByCompanyId)
module.exports = router;