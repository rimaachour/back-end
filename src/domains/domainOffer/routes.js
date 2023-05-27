const express = require('express');
const router = express.Router();
const authentication = require("../../middleware/authentication.js");
const DomainOfferController=require('../domainOffer/controller.js');

router.post("/addDomainOffer",authentication,DomainOfferController.addDomainOffer);
router.put("/updateDomainOffer",authentication,DomainOfferController.updateDomainOffer)
module.exports = router;