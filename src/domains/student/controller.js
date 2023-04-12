const { generateOTP } = require('../../helpers/OTP');
const { mail } = require('../../helpers/mailer');
const Student= require('../student/model')
const bcrypt = require('bcrypt');
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
    // Vérifie si les mots de passe correspondent
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


const addStudentWithImage = async (req, res) => {
  console.log(',,,',req.body)
  console.log("bbb",req.file)
      // Get the uploaded file from the request
      const file = req.file;
  
      // Read the file as a buffer
      const imageBuffer = file.buffer;


      // Convert the buffer to a base64 string
      //const base64Image = imageBuffer.toString('base64');
      // Set the image type to the uploaded file's mimetype
      //const imageType = file.mimetype.split('/')[1];
      console.log(imageBuffer)
  try {


    // Create a new student with the provided name, age, and image
   /* const newStudent = await Student.create({
      firstname: req.body.firstname,
      LastName: req.body.LastName,
      Number: req.body.Number,
      streetAdress: req.body.streetAdress,
      city: req.body.city,
      state: req.body.state,
      Postal: req.body.Postal,
      place: req.body.place,
      schoolname: req.body.schoolname,
      schoollocation: req.body.schoollocation,
      firstattend: req.body.firstattend,
      finalattend: req.body.finalattend,
      photo: base64Image,
      imageType,
    });

    console.log(`New student ${newStudent.firstname} added to database with image.`);
    res.send(`New student ${newStudent.firstname} added to database with image.`);*/
  } catch (error) {
    console.error('Error adding student with image:', error.message);
    res.status(500).send(`Error adding student with image: ${error.message}`);
  }
};

module.exports = {
  registerUser,
  getAllStudents,
  getStudentByName,
  updateStudentById,
  deleteStudentById,
  verifyOTP,
  addStudentWithImage

}
