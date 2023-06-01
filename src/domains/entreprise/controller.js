const { generateOTP } = require('../../helpers/OTP');
const { mail } = require('../../helpers/mailer');
const Entreprise = require('./model');
const Student = require('../student/model')
const bcrypt = require('bcrypt');
const multer = require('multer');
 const studentSkills = require('../StudentSkill/model')
const { GenerateToken } = require('../../helpers/JWT');
const sequelize = require('../../config/db');
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, logo, callback) => {
    if (logo.mimetype.startsWith('image/')) {
      callback(null, true);
    } else {
      callback(new Error('Only image files are allowed'));
    }
  }
});
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

  
  try {
    if((req.local.id!=req.params.id)||(req.local.type !='company')){
      throw new Error("You can't update this user")
    }

    const user1 = await Entreprise.findOne({
      where: { id: id }
    })
  
    if (!user1) {
      throw new Error('User not found');
    }
    console.log(user1);
    console.log(req.body)
    // Update the user object with the new data
    user1.description = data.description;
    user1.domain = data.domain;
    user1.address = data.address;
    user1.logo = data.logo;
    user1.name= data.name;
    user1.email=data.email;
    user1.location=data.location;
    user1.Mobile=data.Mobile;
    user1.service1=data.service1,
    user1.service2=data.service2,
    user1.service3=data.service3,
    user1.service4=data.service4


    // Save the updated user object to the database
     await user1.save();
  
      // Send a response indicating success
     res.status(200).send('Data updated successfully');
    
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
const getEntreprise = async (req,res,next) => {
const{id}=req.params;

  try {
    if ((req.local.type != 'company'&& req.local.type != 'student')||(req.local.id != req.params.id)) {
      throw new Error("You're not authorized to update this profile");
    }
    const user1 = await Entreprise.findOne({ where: { id } });
if(!user1){
  throw new Error("User not found");

}
    const userData = {
    id:user1.id,
    description : user1.description,
    domain : user1.domain,
    address :user1.address,
    logo :user1.logo,
    name:user1.name,
    email:user1.email,
    location:user1.location,
    Mobile:user1.Mobile,
   service4:user1.service4,
   service1:user1.service1,
   service2:user1.service2,
   service3:user1.service3,
    };
    return res.status(200).json(userData);
  } catch (err) {
     next(err);
  }
};
// const getEntrepriseByName = async (req, res) => {
//   try {
//     const entreprise = await Entreprise.findOne({
//       where: { name: req.params.name },
//     });
//     if (!entreprise) {
//       return res.status(404).send('entreprise not found');
//     }
//     res.status(200).send(entreprise);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// };

// const updateEntrepriseById = async (req, res) => {
//   try {
//     const [rowsUpdated, [updatedEntreprise]] = await Entreprise.update(
//       req.body,
//       {
//         returning: true,
//         where: { id: req.params.id },
//       }
//     );
//     if (!rowsUpdated) {
//       return res.status(404).send('Entreprise not found');
//     }
//     res.status(200).send(updatedEntreprise);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// };
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
    // if (req.local.type !== 'company') {
    //   throw new Error('You are not authorized to see offers');
    // }

    const { skillId } = req.query;

    try {
      const studentsskill = await studentSkills.findAll({
        where: {
          skillId: skillId,
        },
        include: [
          {
            model: Student,
            through: {
              attributes: ['studentId']
            },
            // Include the Profile model to fetch the detailed profile
          },
        ],
      });

      res.status(200).send(studentsskill);
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

/////////////////////////
// get all the data 
const getStudentProfile = async (req, res, next) => {
  try {
    if (req.local.type !== 'company') {
      throw new Error("You're not authorized to see student profiles");
    }

    const student = await Student.findAll();
    console.log(student)
    res.status(200).json(student);
  } catch (err) {
    next(err);
  }
};

const getStudentProfileID = async (req, res, next) => {
  const id = req.params;
  try {
    if (req.local.type !=='company') {
      throw new Error("You're not authorized to see student profiles");
    }

    const student = await Student.findOne({ where: id });

    if (!student) {
      throw new Error("Student not found");
    }

    const userData = {
      id: student.id,
      name: student.name,
      firstname: student.firstname,
      LastName: student.LastName,
      email: student.email,
      Number: student.Number,
      streetAdress: student.streetAdress,
      city: student.city,
      state: student.state,
      Postal: student.Postal,
      Fb: student.Fb,
      schoolname: student.schoolname,
      skills: student.skills,
      GitHub: student.GitHub,
      WhatsApp: student.WhatsApp,
      bio: student.bio,
      file: student.file,
      LinkedIn: student.LinkedIn,
      studyEstablishment: student.studyEstablishment,
      studyfield: student.studyfield,
      DateExperience: student.DateExperience,
      TitreExperience: student.TitreExperience,
      PlaceExperience: student.PlaceExperience,
      descriptionExperience: student.descriptionExperience,
      projectName: student.projectName,
      startDate: student.startDate,
      finDate: student.finDate,
      projectStatus: student.projectStatus
    };

    res.status(200).json(userData);
  } catch (err) {
    next(err);
  }
};


const getPopularStudentProfiles = async (req, res, next) => {
  try {
    if (req.local.type !== 'company') {
      throw new Error("You're not authorized to see student profiles");
    }

    const popularProfiles = await Student.findAll({
      where: { popular: true },
      limit: 6,
      order: sequelize.literal('RAND()'), // Retrieves random profiles (MySQL)
    });

    res.status(200).json(popularProfiles);
  } catch (err) {
    next(err);
  }
};
















module.exports = {
  registerCompany,
   getEntreprise,
  // getEntrepriseByName,
  //updateEntrepriseById,
  deleteEntrepriseById,
  verifyOTP1,
  updateCompny,
  searchStudentBySkills,
  resendOtpCRegister,
  getStudentProfile,
  getStudentProfileID,
  getPopularStudentProfiles
};
