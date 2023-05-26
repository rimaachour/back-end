const express = require('express');
const router = express.Router();
const authentication = require('../../middleware/authentication');
const TimeController=require("../Time/controller");
router.post('/addTime',authentication,TimeController.addTime);
router.put('/updateTime/:id',authentication,TimeController.modifyTime);
router.delete('/deleteTime/:id',authentication,TimeController.deleteTime);
router.get('/getTime',authentication,TimeController.getTime)
module.exports = router;