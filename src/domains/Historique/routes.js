const express = require('express');
const router = express.Router();
const authentication = require("../../middleware/authentication.js");
const HistoriqueController=require("../Historique/controller")
router.post('/applyOffer/:id',authentication,HistoriqueController.applyOffre)


module.exports = router;




