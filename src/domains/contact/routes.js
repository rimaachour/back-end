const express = require("express");
const router = express.Router();

const ContactController = require("../contact/controller");
router.post("/sendContactMessage",ContactController.submitContactForm);


module.exports = router;