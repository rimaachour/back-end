const entrepriseController = require('../entreprise/controller.js');
const Student = require("../student/model.js");
const authentication = require("../../middleware/authentication.js");

const router = require('express').Router();

// Protected routes


router.post('/registerCompany', entrepriseController.registerCompany);
router.get('/getAllEntreprise',authentication, entrepriseController.getAllEntreprise);
router.put('/:id', authentication,entrepriseController.updateEntrepriseById);
router.delete('/:id',authentication, entrepriseController.deleteEntrepriseById);
router.post('/verifyOTP1',authentication, entrepriseController.verifyOTP1);
router.put('/updateCompny/:id',authentication, entrepriseController.updateCompny);
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

router.get('/:nom',authentication, entrepriseController.getEntrepriseByName);

module.exports = router;
