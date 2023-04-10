const express = require('express');
const router = express.Router();
const { createCV, updateCV, deleteCV } = require('../CV/controller');

router.post('/createcv', createCV);
router.put('/updatecv/:id',updateCV);
router.delete('/deletecv/:id', deleteCV);

module.exports = router;
