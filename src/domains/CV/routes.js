const express = require('express');
const router = express.Router();
const { createCV, updateCV, deleteCV } = require('../CV/controller');
const authentication = require('../../middleware/authentication');

router.post('/createcv', authentication,createCV);
router.put('/updatecv/:id',authentication,updateCV);
router.delete('/deletecv/:id', authentication,deleteCV);

module.exports = router;
