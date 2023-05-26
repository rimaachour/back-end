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
const saved_offers = require ('../domains/savedOffers');
const profiles = require('../domains/favoriteProfiles');
const preference = require('../domains/preference');
const skills = require('../domains/skills');
const StudentSkill = require('../domains/StudentSkill');
const Contact = require('../domains/contact');
const Historique = require('../domains/Historique');
const location = require('../domains/loaction');
const Time = require('../domains/Time');
const favorisOffers = require('../domains/favorisOffers');
router.use("/auth", auth);
router.use("/admin", admin);
router.use("/entreprise", entreprise);
router.use("/student", student);
//router.use("/cv", CV);
router.use("/uploads", upload)
router.use("/offer", Offer)
router.use("/review", Review)
//router.use("/otp", otp)
 router.use("/domain",filiere)
router.use("/domain", Domain)
router.use("/preference",preference)
router.use("/skills",skills)
router.use("/studentSkills",StudentSkill)
router.use("/contact",Contact)
router.use("/savedoffers",saved_offers);
router.use("/Profiles",profiles);
router.use("/Historique",Historique);
router.use("/location",location);
router.use("/Time",Time);
router.use("/favorisoffers",favorisOffers)
module.exports = router;
