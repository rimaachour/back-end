const entrepriseController = require('../entreprise/controller.js');
const Student = require("../student/model.js");
const authentication = require("../../middleware/authentication.js");

const router = require('express').Router();

// Protected routes


router.post('/registerCompany', entrepriseController.registerCompany);
router.get('/getEntreprise/:id', authentication, entrepriseController.getEntreprise);
// router.put('/updateEntrepriseProfile', authentication, entrepriseController.updateEntreprisProfile);
router.delete('/:id', authentication, entrepriseController.deleteEntrepriseById);
router.post('/verifyOTP1', entrepriseController.verifyOTP1);
router.put('/updateCompny/:id', authentication, entrepriseController.updateCompny);
router.get('/search', authentication, async (req, res, next) => {
    try {
        const { skills } = req.query;
        const students = await Student.findAll({
            where: {
                skills: skills
            }
        });

        return res.status(200).send(students);
    } catch (err) {
        return next(err.message);
    }
});

// router.get('/:nom', authentication, entrepriseController.getEntrepriseByName);
router.post('/ResendOtpCRegister', entrepriseController.resendOtpCRegister);
 router.get('/getprofiles', authentication,entrepriseController.getStudentProfile),
 router.get('/getStudentprofilesID/:id', authentication,entrepriseController.getStudentProfileID),

module.exports = router;
