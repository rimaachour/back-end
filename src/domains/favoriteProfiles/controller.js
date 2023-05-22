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
module.exports = {
    ProfilesSaved
}