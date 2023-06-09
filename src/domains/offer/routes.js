const { Sequelize } = require('sequelize');
const express = require('express');
const router = express.Router();
const offerController = require('../offer/controller');
const Offer = require('./model');
const authentication = require('../../middleware/authentication');

router.post('/addOffer', authentication,offerController.addOffer);
router.delete("/delete/:id",authentication,offerController.deleteOfferById);
router.put("/update/:id",authentication,offerController.updateOffer)
router.get('/getOffers',authentication,offerController.getOffers);
router.get('/getOfferById/:id',authentication,offerController.getOfferById);
router.get('/getPopularOfferDiscover',offerController.getPopularOfferDiscover);
router.get('/getOffersByCompanyId/:id',authentication,offerController.getOffersByCompanyId);
router.get('/searchOffer',authentication,offerController.searchOffers),
router.get('/getOfferDiscoverDetails/:id',authentication,offerController.getPopularofferDiscoverDetails),
router.get('/getPopularOffer',authentication,offerController.getPopularOffers);
router.get('/getCompanyDetailsfromoffer/:id',authentication,offerController.getCompanyDetailsByOfferId);
module.exports = router;

