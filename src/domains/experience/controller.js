const experience = require('./model')


const  addExperience = async(req,res,next) =>{
const {DateExperience,TitreExperience,PlaceExperience,descriptionExperience}=req.body
try {
    if (req.local.type != 'student') {
      throw new Error('You are not authorized to add skills');
    }

const newExperience= await experience.create({
    DateExperience:DateExperience,
    TitreExperience:TitreExperience,
    PlaceExperience:PlaceExperience,
    descriptionExperience:descriptionExperience,
    studentId:req.local.id


});
res.status(200).send(newExperience);
}catch (err) {
    next(err);
  }
};

const deleteExperience = async (req, res, next) => {
    const experienceId = req.params.id;
    try {
      if (req.local.type !== 'student') {
        throw new Error('You are not authorized to delete experiences');
      }
  
      const deletedExperience = await experience.destroy({
        where: {
          id: experienceId,
          studentId: req.local.id,
        },
      });
  
      if (deletedExperience === 0) {
        throw new Error('Experience not found or you are not authorized to delete');
      }
  
      res.status(200).send('Experience deleted successfully');
    } catch (err) {
      next(err);
    }
  };
  
  // Function to update experience
  const updateExperience = async (req, res, next) => {
    const experienceId  = req.params.id;
    const { DateExperience, TitreExperience, PlaceExperience, descriptionExperience } = req.body;
    try {
      if (req.local.type !== 'student') {
        throw new Error('You are not authorized to update experiences');
      }
  
      const updatedExperience = await experience.update(
        {
          DateExperience: DateExperience,
          TitreExperience: TitreExperience,
          PlaceExperience: PlaceExperience,
          descriptionExperience: descriptionExperience,
        },
        {
          where: {
            id: experienceId,
            studentId: req.local.id,
          },
        }
      );
  
      if (updatedExperience[0] === 0) {
        throw new Error('Experience not found or you are not authorized to update');
      }
  
      res.status(200).send('Experience updated successfully');
    } catch (err) {
      next(err);
    }
  };
  
  // Function to get experience by ID
  const getExperience = async (req, res, next) => {
    try {
      if (req.local.type !== 'student') {
        throw new Error('You are not authorized to get experiences');
      }
  
      const foundExperience = await experience.findAll({ // Use "Experience" model instead of "experience"
        where: {
          studentId: req.local.id,
        },
      });
  
      if (!foundExperience) {
        throw new Error('Experience not found or you are not authorized to access');
      }
  
      res.status(200).send(foundExperience);
    } catch (err) {
      next(err);
    }
  };
  

















module.exports = {
    addExperience,
    getExperience,
    updateExperience,
    deleteExperience

}