const Domain = require('./model');
const createDomain = async (req, res) => {
    try {
      const domain  = await Domain.create(req.body);
      res.status(201).json(cv);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };


  module.exports = { createDomain };
