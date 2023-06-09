const entrepriseController = require('../entreprise/controller.js');
const Student = require("../student/model.js");
const authentication = require("../../middleware/authentication.js");

const router = require('express').Router();

// Protected routes


router.post('/registerCompany', entrepriseController.registerCompany);
router.get('/getEntreprise/:id', entrepriseController.getEntreprise);
// router.put('/updateEntrepriseProfile', authentication, entrepriseController.updateEntreprisProfile);
router.delete('/:id', authentication, entrepriseController.deleteEntrepriseById);
router.post('/verifyOTP1', entrepriseController.verifyOTP1);
router.put('/updateCompny/:id', authentication, entrepriseController.updateCompny);
router.get('/search', entrepriseController.searchStudentBySkills)

// router.get('/:nom', authentication, entrepriseController.getEntrepriseByName);
router.post('/ResendOtpCRegister', entrepriseController.resendOtpCRegister);
 router.get('/getprofiles', authentication,entrepriseController.getStudentProfile),
 router.get('/getStudentprofilesID/:id', authentication,entrepriseController.getStudentProfileID),
 router.get('/getPopularProfileStudent',authentication,entrepriseController.getPopularStudentProfiles)

module.exports = router;
