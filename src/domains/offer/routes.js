const { Sequelize } = require('sequelize');
const express = require('express');
const router = express.Router();
const offerController = require('../offer/controller');
const Offer = require('./model');
const authentication = require('../../middleware/authentication');

router.post('/addOffer', authentication,offerController.addOffer);
router.delete("/:id",authentication, offerController.deleteOfferById);
router.put("/offer/:id",authentication,offerController.updateOfferById)
router.get('/search',authentication, offerController.searchInOffers)
module.exports = router;

