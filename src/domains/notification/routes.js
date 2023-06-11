const express = require('express');
const router = express.Router();
const notificationController = require('../notification/controller');
const authentication = require('../../middleware/authentication');

router.get('/getNotification/:id',authentication ,notificationController.getLatestNotifications);

module.exports = router;
