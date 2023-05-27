const express = require('express');
const router = express.Router();
const favorisOfferController = require("../favorisOffers/controller")
const authentication = require("../../middleware/authentication.js");

router.post("/savedfavorisoffer",authentication,favorisOfferController.saveFavorisOffer);
router.get("/getfavoris",authentication,favorisOfferController.getfavorisOffer)
router.delete("/removefavoriteOffer",authentication,favorisOfferController.removeFavoriteOffers)



module.exports = router;