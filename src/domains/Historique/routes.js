const express = require('express');
const router = express.Router();



const authentication = require("../../middleware/authentication.js");
const HistoriqueController = require("../Historique/controller")
router.post('/applyOffer/:id',authentication, HistoriqueController.applyOffre)
router.get('/getNumber', authentication, HistoriqueController.getAppliedOffersCount);
// router.get('/getAppliedOffer',authentication,HistoriqueController.getAppliedOffer);
router.get('/getAppliedStudent', authentication, HistoriqueController.getAppliedStudents)
router.get('/getAppliedOfferByStudentId',authentication,HistoriqueController.getAppliedOffersByStudentId)
//refuserStatus
router.put('/rejeterApp',authentication,HistoriqueController.rejectApplication);
//accepterStatus
router.put('/updateStatus',authentication,HistoriqueController.updateApplicationStatus);
module.exports = router;




