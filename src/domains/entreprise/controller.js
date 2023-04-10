
const Entreprise = require('./model');

// create main model
// const Student = db.student
// main work
// 1. create product

const registerCompany = async (req, res, next) => {
  const { name, email, password, confirmpassword } = req.body;

  try {
    // Vérifie si les mots de passe correspondent
    if (password !== confirmpassword) {
      throw new Error('Les mots de passe ne correspondent pas');
    }

    let messageBienvenue = 'welcome company';

    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmPasswordHash = await bcrypt.hash(confirmpassword, 10);

    const newUser = new Entreprise({
      name: name,
      email: email,
      password: hashedPassword,
      confirmpassword:confirmPasswordHash,
      role: "company"
    })

    const saved= await newUser.save();
    if (saved) {
      return res.status(200).send(newUser)
    }

  } catch (err) {
    return next(err.message);
  }
};


async function verifyOTP1(req, res) {
  const { email, OTP } = req.body;

  try {
    const entreprise = await Entreprise.findOne({ where: { email: email } });

    if (!entreprise) {
      return res.status(404).json({ message: 'compagny not found' });
    }

    if (entreprise.OTP !== OTP) {
      return res.status(401).json({ message: 'OTP not verified' });
    }

    res.status(200).json({ message: 'OTP verified' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error verifying OTP' });
  }
}









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
    registerCompany,
    getAllEntreprise,
    getEntrepriseByName,
    updateEntrepriseById,
    deleteEntrepriseById,
    verifyOTP1
  };
  