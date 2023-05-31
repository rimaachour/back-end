const { Op } = require('sequelize');
const { generateOTP } = require('../../helpers/OTP');
const { mail } = require('../../helpers/mailer');
const Student = require('../student/model')
const Offer = require('../offer/model');
const Time = require('../Time/model');
const location = require('../loaction/model');
const domainOffer = require('../domainOffer/model');

const studentValidation = require('../../helpers/studentValidation')
const bcrypt = require('bcryptjs');
const multer = require('multer');
const Skill = require('../skills/model')
const StudentSkill = require('../StudentSkill/model')
const { GenerateToken } = require('../../helpers/JWT');
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype.startsWith('image/')) {
      callback(null, true);
    } else {
      callback(new Error('Only image files are allowed'));
    }
  }
});
// create main model
// const Student = db.student
// main work
// 1. create product

const registerUser = async (req, res, next) => {
  const { name, email, password, confirmpassword } = req.body;
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    const emailExists = await Student.findOne({ where: { email: email } });
    if (emailExists) {
      throw new Error('Email already exists');
    }


    if (password !== confirmpassword) {
      throw new Error('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmPasswordHash = await bcrypt.hash(confirmpassword, 10);
    const otp = await generateOTP();

    const newUser = await new Student({
      name: name,
      email: email,
      password: hashedPassword,
      confirmpassword: confirmPasswordHash,
      role: "student",
      OTP: otp,
      status: 'pending activation'
    });

    await mail(newUser.email, 'otp', otp);
    await newUser.save();

    res.status(200).json({ user: newUser, status: true, message: "Student added successfully" });

  } catch (err) {
    next(err);
    console.log(err.message);
  }
};


// function verification OTP

async function verifyOTP(req, res, next) {
  const { email, OTP } = req.body;

  try {
    const student = await Student.findOne({ where: { email: email } });
    if (!student) {
      throw new Error('Student not found');
    }

    if (student.status === 'active') {
      throw new Error('Student already verified');
    }
    if (student.OTP != +OTP) {
      throw new Error('OTP not verified');
    }
    student.status = 'active';
    await student.save();
    res.status(200).json({ status: true, message: 'OTP verified' });

  } catch (error) {
    next(error);
  }
}

///////////////////////////////ResendOTPRegister//////////////////////
async function resendOtpSRegister(req, res, next) {
  const { email } = req.body;


  try {

    const user = await Student.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    if (user.isVerified) {
      throw new Error('User already verified');
    }
    const otp = await generateOTP(); // Generate OTP
    user.OTP = otp;
    await user.save();
    await mail(user.email, "OTP Verification", `Your OTP is ${otp}`);
    res.status(200).json({
      status: true,
      message: 'New OTP sent to your email',
    });
  } catch (error) {
    next(error)

  }
}
// 2. get all students

const getAllStudents = async (req, res) => {
  try {
    const user = req.local;
    const students = await Student.findAll({
      attributes: ["id",
        "name",
        "firstname",
        "LastName",
        "email",
        "role",
        "file",
        "Number",
        "streetAdress",
        "city",
        "state",
        "Postal",
        "Fb",
        "LinkedIn",
        "GitHub",
        "LinkedIn",
        "WhatsApp",
        "bio",
        "studyEstablishment",
        "status",
        "studyfield",
        "DateExperience",
        "TitreExperience",
        "PlaceExperience",
        "descriptionExperience",
        "projectName",
        "startDate",
        "finDate",
        "projectStatus"
      ]
    });
    // again ?
    res.status(200).json({ students, user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};



// const getStudentByName = async (req, res) => {
//   try {
//     const student = await Student.findOne({
//       where: { Name: req.params.Name },
//     });
//     if (!student) {
//       return res.status(404).send('Student not found');
//     }
//     res.status(200).send(student);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// };
// 4. update Student
const updateStudentById = async (req, res) => {
  try {
    const [rowsUpdated, [updatedStudent]] = await Student.update(
      req.body,
      {
        returning: true,
        where: { id: req.params.id },
      }
    );
    if (!rowsUpdated) {
      return res.status(404).send('Student not found');
    }
    res.status(200).send(updatedStudent);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// 5. delete student by id
const deleteStudentById = async (req, res) => {
  try {
    const rowsDeleted = await Student.destroy({
      where: { id: req.params.id },
    });
    if (!rowsDeleted) {
      return res.status(404).send('Student not found');
    }
    res.status(200).send('Student deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
const updateUser = async (req, res, next) => {

  const data = req.body; // Get the data from the request body


  try {
    const { id } = req.params; // Get the user ID from the request parameters
    if ((req.local.id != req.params.id) || (req.local.type != 'student')) {
      throw new Error("You can't update this user")
    }
    const user2 = await Student.findOne({
      where: { id: id }
    })

    if (!user2) {
      throw new Error('User not found');
    }
    console.log(user2);
    console.log(req.body)

    // Update the user object with the new data
    user2.firstname = data.firstname;
    user2.LastName = data.LastName;
    user2.Number = data.Number;
    user2.streetAdress = data.streetAdress;
    user2.city = data.city;
    user2.state = data.state;
    user2.Postal = data.Postal;
    user2.bio = data.bio;
    user2.schoolname = data.schoolname;
    user2.skills = data.skills
    user2.Fb = data.Fb;
    user2.WhatsApp = data.WhatsApp;
    user2.GitHub = data.GitHub;
    user2.file = data.file;
    user2.LinkedIn = data.LinkedIn;
    user2.studyEstablishment = data.studyEstablishment;
    user2.studyfield = data.studyfield
    user2.DateExperience = data.DateExperience,
      user2.TitreExperience = data.TitreExperience,
      user2.PlaceExperience = data.PlaceExperience,
      user2.descriptionExperience = data.descriptionExperience,
      user2.projectName = data.projectName,
      user2.startDate = data.startDate,
      user2.finDate = data.finDate,
      user2.projectStatus = data.projectStatus
    await user2.save();
    res.status(200).send('Data updated successfully');
  } catch (err) {
    next(err);
  }
}

// get all the data 
const getProfile = async (req, res, next) => {
  const { id } = req.params;

  try {
    if ((req.local.id != req.params.id) || (req.local.type != 'student')) {
      throw new Error("You can't update this user")
    }
    const user2 = await Student.findOne({ where: { id } });
    if (!user2) {
      throw new Error("User not found");
    }

    const userData = {
      name: user2.name,
      id: user2.id,
      firstname: user2.firstname,
      LastName: user2.LastName,
      email: user2.email,
      Number: user2.Number,
      streetAdress: user2.streetAdress,
      city: user2.city,
      state: user2.state,
      Postal: user2.Postal,
      Fb: user2.Fb,
      schoolname: user2.schoolname,
      skills: user2.skills,
      GitHub: user2.GitHub,
      WhatsApp: user2.WhatsApp,
      bio: user2.bio,
      file: user2.file,
      LinkedIn: user2.LinkedIn,
      studyEstablishment: user2.studyEstablishment,
      studyfield: user2.studyfield,
      DateExperience: user2.DateExperience,
      TitreExperience: user2.TitreExperience,
      PlaceExperience: user2.PlaceExperience,
      descriptionExperience: user2.descriptionExperience,
      projectName: user2.projectName,
      startDate: user2.startDate,
      
      finDate: user2.finDate,
      projectStatus: user2.projectStatus,

    };

    return res.status(200).json(userData);
  } catch (err) {
    return next(err);
  }
};




/// searchOffer////////////
const serachofferDomain = async (req, res, next) => {
  const { domainOfferId, locationId, type } = req.query;
  try {
  if  (req.local.type != 'student'){
    throw new Error("You can't update this user")
  }
    const offres = await Offer.findAll({
      where: {
        [Op.and]: [
          domainOfferId ? {
            domainOfferId
          } : {},
          locationId ? {
            locationId
          } : {},
          type ? {
            type
          } : {},
        ]
      },
      include: [
        {
          model: domainOffer,
          as: 'domainOffer',
        },
        {
          model: location,
          as: 'location',
        },
      ],
    })
    res.json(offres);
  }
  catch (error) {
    console.log(error);
    //res.status(500).json({ error: 'Une erreur s\'est produite.' });
    next(error);
  }

}





module.exports = {
  registerUser,
  getAllStudents,
  // getStudentByName,
  updateStudentById,
  deleteStudentById,
  verifyOTP,
  updateUser,
  serachofferDomain,
  resendOtpSRegister,
  getProfile,




}
