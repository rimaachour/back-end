const { generateOTP } = require('../../helpers/OTP');
const { mail } = require('../../helpers/mailer');
const Student= require('../student/model')
const bcrypt = require('bcryptjs');
const multer = require('multer');
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




// sign in 



  const registerUser = async (req, res, next) => {
    const { name, email, password, confirmpassword } = req.body;
    console.log(password,confirmpassword)

    try {
      if (password !== confirmpassword) {
        throw new Error('Les mots de passe ne correspondent pas');
      }

      let messageBienvenue = 'welcome User';

      const hashedPassword = await bcrypt.hash(password, 10);
      const confirmPasswordHash = await bcrypt.hash(confirmpassword, 10);
      const otp =await generateOTP()


      const newUser = new Student({
        name:name,
        email: email,
        password: hashedPassword,
        confirmpassword:confirmPasswordHash,
        role: "student",
        OTP :otp
      }); 

  await mail(newUser.email,'otp',otp)



      const saved= await newUser.save();
      if (saved) {
        return res.status(200).send(newUser)
      }

    } catch (err) {
      return next(err.message);
    }
  };


async function verifyOTP(req, res) {
  const { email, OTP} = req.body;
  console.log(email)

  try {
    const student = await Student.findOne({ where: {email: email} });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (student.OTP === OTP) {
      student.status='active'
      return res.status(200).json({ message: 'OTP verified' });
    } else {
      return res.status(400).json({ message: 'OTP not verified' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error verifying OTP' });
  }}

// 2. get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({});
    res.status(200).send(students);
  } catch (err)  {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// 3. get single student
//const getStudentById = async (req, res) => {
  //try {  console.log(Student); // add this line to check if Student is defined

    ////where: { id: req.params.id },
    //});
    //if (!student) {
      //return res.status(404).send('Student not found');
    //}
    //res.status(200).send(student);
  //} catch (err) {
    //console.error(err);
    //res.status(500).send('Server Error');
  //}
//};
const getStudentByName = async (req, res) => {
  try {
    const student = await Student.findOne({
      where: { Name: req.params.Name },
    });
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.status(200).send(student);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
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

// 6. get published student
//const getPublishedStudent = async (req, res) => {
  //const students = await Student.findAll({ where: { published: true } })
  //res.status(200).send(students)
//}


const updateUser = async (req, res, next) => {
  const { id } = req.params; // Get the user ID from the request parameters
  const data = req.body; // Get the data from the request body

  const user = await Student.findOne({
    where:{id:id}
  })
  
  if (!user) {
    throw new Error('User not found');
  }
  console.log(user);
console.log(req.body)
  try {

  
    // Update the user object with the new data
    user.firstname = data.firstname;
    user.LastName = data.LastName;
    user.Number = data.Number;
    user.streetAdress = data.streetAdress;
    user.city = data.city;
    user.state = data.state;
    user.Postal = data.Postal;
    user.place = data.place;
    user.schoolname = data.schoolname;
    user.schoollocation = data.schoollocation;
    user.firstattend = data.firstattend;
    user.finalattend = data.finalattend;
    user.file = data.file;
  
    // Save the updated user object to the database
    const saved = await user.save();
    if (saved) {
      // Send a response indicating success
      return res.status(200).send('Data updated successfully');
    }
  } catch (err) {
    return next(err.message);
  }


}






module.exports = {
  registerUser,
  getAllStudents,
  getStudentByName,
  updateStudentById,
  deleteStudentById,
  verifyOTP,
  updateUser


}
