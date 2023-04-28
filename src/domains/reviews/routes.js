const express = require('express');
const router = express.Router();
const ReviewController = require("../reviews/controller");
const authentication = require('../../middleware/authentication');



router.post('/addEntrepriseReview',authentication, ReviewController.addEntrepriseReview);
router.post('/addStudentReview',authentication, ReviewController.addStudentReview);

module.exports = router;
