const preference = require('./model');
const createpreference = async (req, res) => {
    try {
      const preference = await preference.create(req.body);
      res.status(201).json(cv);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };


  module.exports = { createpreference };