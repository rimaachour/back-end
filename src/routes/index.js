const express = require("express");
const router = express.Router();

const auth = require("./../domains/auth");

const admin = require("./../domains/admin");
const entreprise = require("./../domains/entreprise");
const student = require("./../domains/student");
const CV = require('../domains/CV')

router.use("/auth", auth);

router.use("/admin", admin);
router.use("/entreprise", entreprise);
router.use("/student", student);
router.use("/cv", CV);


module.exports = router;
