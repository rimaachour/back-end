const { generateOTP } = require('../../helpers/OTP');
const { mail } = require('../../helpers/mailer');
const Entreprise = require('./model');
const Student=require('../student/model')
const bcrypt = require('bcrypt');
const multer = require('multer');
const { GenerateToken } = require('../../helpers/JWT');
const storage = multer.memoryStorage();
/*const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype.startsWith('image/')) {
      callback(null, true);
    } else {
      callback(new Error('Only image files are allowed'));
    }
  }
});*/

/////////////////////sign up Compagny/////////////////////////////////////



const registerCompany = async (req, res, next) => {
  const emailExists = await Student.findOne({ where: { email: req.body.email } });
  if (emailExists) {
    return res.status(400).json({ error: "email" });
  }
  const { name, email, password, confirmpassword } = req.body;

  try {
    // Vérifie si les mots de passe correspondent
    if (password !== confirmpassword) {
      throw new Error('Les mots de passe ne correspondent pas');
    }

    let messageBienvenue = 'welcome company';

    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmPasswordHash = await bcrypt.hash(confirmpassword, 10);
    const otp =await generateOTP()

    const newUser = await new Entreprise({
      name: name,
      email: email,
      password: hashedPassword,
      confirmpassword:confirmPasswordHash,
      role: "company",
      OTP :otp,
      status:'pending activation'

    });
    await mail(newUser.email,'otp',otp)


    const saved= await newUser.save();
    if (saved) {
      const token = await GenerateToken({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        type: "company"
      });
      return res.status(200).json({user: newUser, token});
    }

  } catch (err) {
    return next(err.message);
  }
};
///////////////////////////////////////////////////////////////////

const updateCompny = async (req, res, next) => {
  const { id } = req.params; // Get the user ID from the request parameters
  const data = req.body; // Get the data from the request body

  const user1 = await Entreprise.findOne({
    where:{id:id}
  })
  
  if (!user1) {
    throw new Error('User not found');
  }
  console.log(user1);
console.log(req.body)
  try {

// Update the user object with the new data
    user1.description = data.description;
    user1.domain = data.domain;
    user1.address = data.address;
    user1.logo = data.logo;
    
  
    // Save the updated user object to the database
    const saved = await user1.save();
    if (saved) {
      // Send a response indicating success
      return res.status(200).send('Data updated successfully');
    }
  } catch (err) {
    return next(err.message);
  }


}










///////////////OTP///////////////////////

async function verifyOTP1(req, res) {
  const { email, OTP } = req.body;

  const entreprise = await Entreprise.findOne({ where: { email: email } });
  if (!entreprise) {
    return res.status(404).json({ status: false, message: 'compagny not found' });
  }
  
  if (entreprise.status === 'active') {
    return res.status(400).json({ status: false, message: 'company already verified' });
  }

  try {
    if (entreprise.OTP === +OTP) {
      entreprise.status = 'active';
      entreprise.OTP = null;
      await entreprise.save();
      return res.status(200).json({
        status: true,
        message: "OTP verified",
      });
    } else {
      return res.status(400).json({ status: false, message: 'OTP not verified' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Error verifying OTP' });
  }
}






///////////////////////getCompagny///////////////////////////////////////////
  const getAllEntreprise = async (req, res) => {
    try {
      const user = req.local;
      
      const entreprises = await Entreprise.findAll({});
      res.status(200).json({entreprises, user});
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
  ///////////////////////DELETE/////////////////////////////////////////
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
  //////////////////////////////searchProfileStudent////////////////////
  const searchStudentBySkills = async (req, res, next) => {
  
  
    try {
        const { skills } = req.query;
      const students = await Student.findAll({
        where: {
          skills: skills
        }
      });
  
      return res.status(200).send(students);
    } catch (err) {
      return next(err.message);
    }
  };















  module.exports = {
    registerCompany,
    getAllEntreprise,
    getEntrepriseByName,
    updateEntrepriseById,
    deleteEntrepriseById,
    verifyOTP1,
    updateCompny,
    searchStudentBySkills
  };
  