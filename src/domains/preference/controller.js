const preference = require('./model');
const {Filiere} = require('../domain/model')

const chooseFiliere = async (req, res, next) => {
 
  try {
    const { filiereID } = req.body;
    const studentID = req.local.id; // Assuming the student ID is stored in req.local.id
  
    if (req.local.type != 'student') {
      throw new Error('You are not authorized to choose filiere');
    }

    // Check if the filiere exists
    const filiere = await Filiere.findByPk(filiereID);
    if (!filiere) {
      throw new Error("Filiere not found");
    }

    // Check if the student already has a preference
    const existingPreference = await preference.findOne({
      where: { StudentID:studentID },
    });
    if (existingPreference) {
      throw new Error("Student already has a preference");
    }

    // Create a new preference
    const newPreference = await preference.create({
      name: filiere.name, 
      filiereID: filiereID,
      studentID: studentID,
    });

    res.status(200).send(newPreference);
  } catch (err) {
    console.log(err);
    next(err);
  }
};


module.exports = { chooseFiliere };