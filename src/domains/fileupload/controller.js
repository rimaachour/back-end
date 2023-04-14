// fileRoutes.js
const path = require('path');
const fs = require('fs');

const uploadHandler = (req, res) => {
  const file = req.file;
 /* if (!file || !file.buffer) {
    return res.status(400).send('Invalid file');
  }*/

  

  const fileUrl = `${req.protocol}://${req.hostname}/uploads/${file.filename}`;

  res.json({ message: 'File uploaded successfully', url: fileUrl });
};

const getfile = async (req, res) => {
    console.log("req")
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, '../../../uploads', fileName);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
      }
  
      const contentType = mime.getType(filePath);
      if (!contentType) {
        return res.status(500).send('Invalid content type');
      }
  
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.send(data);
    });
  };
  
  
  
  
  
  

module.exports = {uploadHandler,getfile}

