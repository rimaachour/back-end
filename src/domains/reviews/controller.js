


const Entreprise = require('./model');
const Student=require('../student/model')

const addEntrepriseReview = async (req, res) => {
    const { entrepriseId, studentId, stars, comment } = req.body;
  
    try {
      const student = await Student.findByPk(studentId); // Fetch student data from database
      if (!student) {
        return res.status(400).json({ error: 'Student not found' });
      }
  
      const entreprise = await Entreprise.findByPk(entrepriseId); // Fetch entreprise data from database
      if (!entreprise) {
        return res.status(400).json({ error: 'Entreprise not found' });
      }
  
      const review = await EntrepriseReview.create({ entrepriseId, studentId, stars, comment });
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const addStudentReview = async (req, res) => {
    const { studentId, entrepriseId, stars, comment } = req.body;
  
    try {
      const entreprise = await Entreprise.findByPk(entrepriseId); // Fetch entreprise data from database
      if (!entreprise) {
        return res.status(400).json({ error: 'Entreprise not found' });
      }
  
      const student = await Student.findByPk(studentId); // Fetch student data from database
      if (!student) {
        return res.status(400).json({ error: 'Student not found' });
      }
  
      const review = await StudentReview.create({ studentId, entrepriseId, stars, comment });
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
 
  module.exports = {
    addEntrepriseReview,
    addStudentReview
  }
  