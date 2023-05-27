const express = require('express');
const router = express.Router();
const authentication = require('../../middleware/authentication');
const controlllerSavedOffer = require ('../savedOffers/controller')
router.post('/savedOffer',authentication,controlllerSavedOffer.saveOffer)
router.get('/getSavedoffer',authentication,controlllerSavedOffer.getSavedOffer)
router.get('/savedOfferById/:id',authentication,controlllerSavedOffer.getSavedOfferById);
router.delete('/removeOffer/:id',authentication,controlllerSavedOffer.removeSavedOffer);

module.exports = router;