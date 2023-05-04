const { generateOTP } = require('../../helpers/OTP');
const { mail } = require('../../helpers/mailer');
const Entreprise = require('./model');
const Student = require('../student/model')
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
  const { name, email, password, confirmpassword } = req.body;

  try {

    // Check if email address is already in use
    const emailExists = await Entreprise.findOne({ where: { email: req.body.email } });
    if (emailExists) {
      throw new Error('duplicated Email');
    }




    // Check if passwords match
    if (password != confirmpassword) {
      throw new Error('the password and confirm password diff');
    }

    // Generate OTP and hash passwords
    const otp = await generateOTP();
    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmPasswordHash = await bcrypt.hash(confirmpassword, 10);

    // Create new user
    const newUser = await new Entreprise({
      name: name,
      email: email,
      password: hashedPassword,
      confirmpassword: confirmPasswordHash,
      role: "company",
      OTP: otp,
      status: 'pending activation'
    });

    // Send OTP via email
    await mail(newUser.email, 'otp', otp);

    // Save new user to database
    await newUser.save();

    // Send success response
    res.status(200).json({ user: newUser, status: true, message: "Company Add Successfully" });

  } catch (err) {
    next(err);
    console.log(err.message);
  }
};

///////////////////////////////////////////////////////////////////

const updateCompny = async (req, res, next) => {
  const { id } = req.params; // Get the user ID from the request parameters
  const data = req.body; // Get the data from the request body

  const user1 = await Entreprise.findOne({
    where: { id: id }
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
    next(err);
  }


}

////////////////////////////////////////////////////////resendOTPregister//////////////
async function resendOtpCRegister(req, res, next) {
  const { email } = req.body;
  try {

    const entreprise = await Entreprise.findOne({ where: { email: email } });
    if (!entreprise) {
      throw new Error('Company not found');
    }

    if (entreprise.isVerified) {
      throw new Error('Company already verified');
    }

    const otp = await generateOTP();
    entreprise.OTP = otp;
    await entreprise.save();
    await mail(entreprise.email, 'OTP Verification', `Your OTP is ${otp}`);
    res.status(200).json({
      status: true,
      message: 'New OTP sent to your email',
    });
  } catch (error) {
    next(error)
  }
}









///////////////OTP///////////////////////

async function verifyOTP1(req, res, next) {
  const { email, OTP } = req.body;
  try {

    const entreprise = await Entreprise.findOne({ where: { email: email } });
    if (!entreprise) {
      throw new Error('company not found');
    }

    if (entreprise.status === 'active') {
      throw new Error('Company already verified');
    }
    if (entreprise.OTP != +OTP) {
      throw new Error('OTP not verified');
    }
    entreprise.status = 'active';
    await entreprise.save();
    res.status(200).json({
      status: true,
      message: "OTP verified",
    });
  } catch (error) {
    next(error)
  }
}







///////////////////////getCompagny///////////////////////////////////////////
const getAllEntreprise = async (req, res) => {
  try {
    const user = req.local;

    const entreprises = await Entreprise.findAll({});
    res.status(200).json({ entreprises, user });
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
  searchStudentBySkills,
  resendOtpCRegister
};
