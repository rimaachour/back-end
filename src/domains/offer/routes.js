const { Sequelize } = require('sequelize');
const express = require('express');
const router = express.Router();
const offerController = require('../offer/controller');
const Offer = require('./model');
const authentication = require('../../middleware/authentication');

router.post('/addOffer', authentication,offerController.addOffer);
router.delete("/delete/:id",authentication,offerController.deleteOfferById);
router.put("/update/:id",authentication,offerController.updateOfferById)
router.get('/search',authentication, offerController.searchInOffers);
router.get('/getOffers',authentication,offerController.getOffers);
router.get('/getOfferById/:id',authentication,offerController.getOfferById);

router.get('/getOffersByCompanyId/:id',authentication,offerController.getOffersByCompanyId)
module.exports = router;

