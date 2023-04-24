const express = require('express');
const router = express.Router();
const ReviewController = require("../reviews/controller");

router.post('/addEntrepriseReview', ReviewController.addEntrepriseReview);
router.post('/addStudentReview', ReviewController.addStudentReview);

module.exports = router;
