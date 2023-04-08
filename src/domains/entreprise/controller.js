
const Entreprise = require('./model');

// create main model
// const Student = db.student
// main work
// 1. create product

const createEntreprise = async (req, res) => {
    try {
      const entreprise = await Entreprise.create({
        Name: req.body.Name,
        Email: req.body.Email,
        Password: req.body.Password,
        ConfirmPassword:req.body.ConfirmPassword,
        Role: req.body.Role || "company"

      });
      res.status(200).send(entreprise);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };
  
  const getAllEntreprise = async (req, res) => {
    try {
      const entreprises = await Entreprise.findAll({});
      res.status(200).send(entreprises);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };
  
  const getEntrepriseByName = async (req, res) => {
    try {
      const entreprise = await Entreprise.findOne({
        where: { Name: req.params.Name },
      });
      if (!entreprise) {
        return res.status(404).send('entreprise not found');
      }
      res.status(200).send(entreprise);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };
  
  const updateEntrepriseById = async (req, res) => {
    try {
      const [rowsUpdated, [updatedEntreprise]] = await Entreprise.update(
        req.body,
        {
          returning: true,
          where: { id: req.params.id },
        }
      );
      if (!rowsUpdated) {
        return res.status(404).send('Entreprise not found');
      }
      res.status(200).send(updatedEntreprise);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };
  
  const deleteEntrepriseById = async (req, res) => {
    try {
      const rowsDeleted = await Entreprise.destroy({
        where: { id: req.params.id },
      });
      if (!rowsDeleted) {
        return res.status(404).send('Entreprise not found');
      }
      res.status(200).send('Entreprise deleted successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };
  
  module.exports = {
    createEntreprise,
    getAllEntreprise,
    getEntrepriseByName,
    updateEntrepriseById,
    deleteEntrepriseById,
  };
  