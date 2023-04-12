
const multer = require('multer');
const express = require('express');
const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // specify the directory to store uploaded files
const fileuploadController = require('./controller')
router.post('/uploadfile',upload.single('file'),fileuploadController.uploadHandler)
router.get('/image/:filename',fileuploadController.getfile)



module.exports = router;
