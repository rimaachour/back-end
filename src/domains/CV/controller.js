const CV = require("./model");
const Student = require("../student/model");
const Entreprise = require("../entreprise/model");

//CV.findAll({
  //include: [
   // { model: Student, required: true },
    //{ model: Entreprise, required: true },
  //],
//}).then((result) => {
  //console.log(result);
//});

// CREATE
const createCV = async (req, res) => {
    try {
      const cv = await CV.create(req.body);
      res.status(201).json(cv);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  const updateCV = async (req, res) => {
  
  // UPDATEn 

    try {
      const { id } = req.params;
      const [rowsUpdated] = await CV.update(req.body, { where: { id } });
      if (!rowsUpdated) {
        return res.status(404).json({ message: "CV not found" });
      }
      res.status(200).json({ message: "CV updated successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  
  };
  // DELETE
  const deleteCV = async (req, res) => {
    try {
      const { id } = req.params;
      const rowsDeleted = await CV.destroy({ where: { id } });
      if (!rowsDeleted) {
        return res.status(404).json({ message: "CV not found" });
      }
      res.status(200).json({ message: "CV deleted successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  module.exports = { createCV, updateCV, deleteCV };

