const express = require('express');
const router = express.Router();
const { createCV, updateCV, deleteCV } = require('../controllers/cvController');

router.post('/cv', createCV);
router.put('/cv/:id', updateCV);
router.delete('/cv/:id', deleteCV);

module.exports = router;
