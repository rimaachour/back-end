const express = require('express');
const router = express.Router();

const DomainController = require('../domain/controller');
const authentication = require("../../middleware/authentication.js");
router.post("/adddomain", authentication,DomainController.addDomain);
router.put("/updateDomain/:id",authentication, DomainController.updateDomain);
router.delete("/deleteDomain/:id",authentication, DomainController.deleteDomain);
router.post("/addfilier",authentication, DomainController.addFiliere);
router.put("/updatefiliere/:id",authentication, DomainController.updateFiliere);
router.delete("/deletefilier/:id",authentication, DomainController.deleteFiliere);




module.exports = router;