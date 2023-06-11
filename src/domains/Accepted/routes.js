const express = require('express');
const router = express.Router();
const authentication = require("../../middleware/authentication.js");
 const AcceptedController = require("../Accepted/controller")
router.get('/getAccepted',authentication,AcceptedController.createAcceptedTable)

module.exports = router;