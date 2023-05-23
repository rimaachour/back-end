const express = require('express');
const router = express.Router();
const authentication = require('../../middleware/authentication');
const LocationController=require("../loaction/controller");

router.post('/addLocation',authentication,LocationController.addlocation);
router.put('/updateTime',authentication,LocationController.modifylocation);
router.delete('/deleteTime',authentication,LocationController.Deletelocation);
router.get('/getTime',authentication,LocationController.getLocation)




module.exports = router;