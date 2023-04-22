const { Sequelize } = require('sequelize');
const express = require('express');
const router = express.Router();
const offerController = require('../offer/controller');
const Offer = require('./model');

router.post('/addOffer', offerController.addOffer);
router.delete("/:id", offerController.deleteOfferById);
router.put("/offer/:id",offerController.updateOfferById)
router.get('/search', offerController.searchInOffers)
module.exports = router;

