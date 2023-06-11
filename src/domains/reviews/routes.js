const express = require('express');
const router = express.Router();
const ReviewController = require("../reviews/controller");
const authentication = require('../../middleware/authentication');

router.post ('/reviewStudentToCompany',authentication,ReviewController.ReviewStudentToCompany),
router.post('/reviewCompanyToStudent',authentication,ReviewController.ReviewCompanyToStudent)


module.exports = router;