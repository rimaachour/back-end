const express = require('express');
const router = express.Router();
const authentication = require('../../middleware/authentication');
const LocationController=require("../loaction/controller");

router.post('/addLocation',authentication,LocationController.addlocation);
router.put('/updateLocation/:id',authentication,LocationController.modifylocation);
router.delete('/deleteLocation/:id',authentication,LocationController.Deletelocation);
router.get('/getLocation',authentication,LocationController.getLocation)




module.exports = router;