const Favoris = require('./model')
const company = require("../entreprise/model")
const Student = require("../student/model")

const ProfilesSaved = async (req,res,next) =>{
const {studentId}=req.body;
const companyId = req.local.id;
try{
    if (req.local.type != 'company') {
        throw new Error('You are not authorized to save profiles');
      }
      const existingSavedProfiles = await Favoris.findOne({
        where:{
            studentId,
            companyId,
        },

      });
      if (existingSavedProfiles){
        throw new Error ('Profile already saved by the comapny')
      }

 await Favoris.create({
    studentId,
    companyId,
});
res.status(200).json({ message: 'Profile saved successfully.' });
    } catch (error) {
      next(error);
    }

}


const getAllProfiles = async (req, res, next) => {
  try {
    if (req.local.type != 'company') {
      throw new Error('You are not authorized to save profiles');}
    const profiles = await Favoris.findAll();
    res.status(200).json(profiles);
  } catch (error) {
    next(error);
  }
}


const getAllProfilesByCompanyId = async (req, res, next) => {
  const companyId = req.local.id;
  
   // Assuming companyId is available in req.local
  try {
    if (req.local.type !== 'company') {
      throw new Error('You are not authorized to retrieve profiles');
    }

    const profiles = await Favoris.findAll({
       where: { companyId,
       
  },
  include : Student
   });
    res.status(200).json(profiles);
  } catch (error) {
    next(error);
  }
};



////////////removefavorite///////////////////










module.exports = {
    ProfilesSaved,
    getAllProfiles,
    getAllProfilesByCompanyId
}