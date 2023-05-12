const express = require("express");
const router = express.Router();

const auth = require("./../domains/auth");
const admin = require("./../domains/admin");
const entreprise = require("./../domains/entreprise");
const student = require("./../domains/student");
const CV = require('../domains/CV')
const upload = require('../domains/fileupload')
const Offer = require('../domains/offer');
const Review = require('../domains/reviews')
//const otp = require('../domains/OTP')
const filiere =require('../domains/filiere');
const Domain = require('../domains/domain');
const preference = require('../domains/preference')
const skills = require('../domains/skills')

router.use("/auth", auth);
router.use("/admin", admin);
router.use("/entreprise", entreprise);
router.use("/student", student);
//router.use("/cv", CV);
router.use("/uploads", upload)
router.use("/offer", Offer)
router.use("/review", Review)
//router.use("/otp", otp)
router.use("/filiere",filiere)
router.use("/domain", Domain)
router.use("/preference",preference)
router.use("/skills",skills)
//router.use("/studentSkills",skills2)
module.exports = router;

