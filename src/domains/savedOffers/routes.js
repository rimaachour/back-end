const express = require('express');
const router = express.Router();
const authentication = require('../../middleware/authentication');
const controlllerSavedOffer = require ('../savedOffers/controller')
router.post('/savedOffer',authentication,controlllerSavedOffer.saveOffer)




module.exports = router;
