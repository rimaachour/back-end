const express = require('express');
const router = express.Router();
const subscribersController = require('../subscribers/controller');
const authentication = require('../../middleware/authentication');

router.post('/sabonner',authentication,subscribersController.sAbonner)
module.exports = router