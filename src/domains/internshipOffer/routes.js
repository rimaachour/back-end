const { Sequelize } = require('sequelize');
const express = require('express');
const router = express.Router();
const {addOffer} = require('../internshipOffer/controller');

router.post('/addOffer', addOffer);
module.exports = router;

