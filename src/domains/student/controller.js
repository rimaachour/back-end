const { mail } = require('../../helpers/mailer');
const Student= require('../student/model')

// create main model
// const Student = db.student
// main work
// 1. create product




// sign in 



const createStudent = async (req, res) => {
  try  {
    await mail('rimaachour57@gmail.com','test','123')
    const student = await Student.create({

      Name: req.body.Name,
      Email: req.body. Email,
      Password: req.body.Password,
      ConfirmPassword: req.body.ConfirmPassword,
      

    
   
  });
  
  res.status(200).send(student);
}   catch (err) {
  console.error(err);
  res.status(500).send('Server Error');
}
};

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

module.exports = {
  createStudent,
  getAllStudents,
  getStudentByName,
  updateStudentById,
  deleteStudentById,
 
}
