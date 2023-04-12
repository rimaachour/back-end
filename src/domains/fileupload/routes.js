
const multer = require('multer');
const express = require('express');
const router = express.Router();
const mime = require('mime-types');

const imageFileFilter = (req, file, callback) => {
  // Get the MIME type of the uploaded file
  const mimeType = mime.lookup(file.originalname);

  // Check if the MIME type is an image type
  if (mimeType.startsWith('image/')) {
    callback(null, true);
  } else {
    callback(new Error('Invalid file type. Only image files are allowed.'));
  }
};
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      callback(null, fileName);
    },
  });
  const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
  });
const fileuploadController = require('./controller')
router.post('/uploadfile',upload.single('file'),fileuploadController.uploadHandler)
router.get('/image/:filename',fileuploadController.getfile)



module.exports = router;
