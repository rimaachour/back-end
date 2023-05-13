const express = require("express");
const router = express.Router();

const AdminController = require('../admin/controller');
const authentication = require("../../middleware/authentication.js");
router.put("/updateoffer/:id",authentication,AdminController.updateOfferStatus);



module.exports = router;



