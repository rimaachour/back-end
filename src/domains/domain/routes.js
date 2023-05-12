const express = require('express');
const router = express.Router();

const DomainController = require('../domain/controller');
router.post("/adddomain", DomainController.addDomain);
router.put("/updateDomain/:id", DomainController.updateDomain);
router.delete("/deleteDomain/:id", DomainController.deleteDomain);
router.post("/addfilier", DomainController.addFiliere);
router.put("/updatefiliere/:id", DomainController.updateFiliere);
router.delete("/deletefilier/:id", DomainController.deleteFiliere);




module.exports = router;