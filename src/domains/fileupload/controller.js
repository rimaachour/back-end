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

const getfile = async (req,res)=>{
    console.log("req")
    const fileName = req.params.filename;
  const filePath = path.join(__dirname, '../../../uploads', fileName);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal server error');
    }

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.send(data);
  });
  
}

module.exports = {uploadHandler,getfile}

