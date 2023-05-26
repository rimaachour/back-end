const express = require("express");
const router = express.Router();

const AdminController = require('../admin/controller');
const authentication = require("../../middleware/authentication.js");
router.put("/updateoffer/:id",authentication,AdminController.updateOfferStatus);
router.put ("/updateStudentPopularity",authentication,AdminController.updateStudentPopularity)
router.put ("/changeOfferPopularity",authentication,AdminController.changeOfferPopularity)

module.exports = router;



