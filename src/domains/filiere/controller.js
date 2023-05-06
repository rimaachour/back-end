const filiere = require('./model');
const createfiliere = async (req, res) => {
    try {
      const filiere = await filiere.create(req.body);
      res.status(201).json(cv);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };


  module.exports = { createfiliere };