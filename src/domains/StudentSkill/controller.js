const StudentSkill = require('./model');
const Student = require('../student/model')
const Skill = require('../skills/model')


const addStudentSkill = async (req, res, next) => {
  const { percentage, SkillId} = req.body;

  try {
    if (req.local.type != 'student') {
      throw new Error('You are not authorized to add skills');
    }

    // Check if the skill exists in the Skill table
    const skill = await Skill.findOne({ where: { id: SkillId } });
    if (!skill) {
      throw new Error('Invalid skill ID');
    }

    const newStudentSkill = await StudentSkill.create({
      skillId: SkillId,
      percentage: `${percentage}%`,
      studentId: req.local.id // Assuming you have the student ID available in req.local.id
    });
console.log(req.local.id);
    res.status(201).send(newStudentSkill);
  } catch (err) {
    next(err);
  }
};



  const deleteStudentSkillById = async (req, res, next) => {
    const studentSkillId = req.params.id;

    try {
      if (req.local.type != 'student') {
        
        throw new Error('You are not authorized to delete skills ');}
      const numDeleted = await StudentSkill.destroy({
        where: {
          id: studentSkillId
        }
      });
      if (numDeleted === 0) { 
        throw new Error(`StudentSkill with ID ${studentSkillId} not found`);
      }
      res.status(200).send(`Deleted StudentSkill with ID ${studentSkillId}`);
    } catch (err) {
      next(err);
    }
  };

  const updatePercentageById = async (req, res, next) => {
    if (req.local.type != 'student') {
        
      throw new Error('You are not authorized to update');}
    const studentSkillId = req.params.id;
    const newPercentage = req.body.percentage;
    try {
        const userpayload = req.local;
      const [numUpdated, updatedRows] = await StudentSkill.update(
        { percentage: newPercentage },
        { where: { id: studentSkillId }, returning: true }
      );
      if (numUpdated === 0) {
        throw new Error(`StudentSkill with ID ${studentSkillId} not found`);
      }
      res.status(200).send(updatedRows[0]);
    } catch (err) {
      next(err);
    }
  };

  const getAllStudentSkills = async (req, res, next) => {

  
    if (req.local.type != 'student') {
        
      throw new Error('You are not authorized to get skills ');}
    try {
    
        const userpayload = req.local;

      const studentSkills = await StudentSkill.findAll({
        include: [{ model: Skill, as: 'Skill' }],
      attributes: {
        exclude: ['Skill.nameskill']
      }
 
      });
      res.status(200).send(studentSkills);
    } catch (err) {
      next(err);
    }
  };


  const getSkillsByStudentId = async (req, res, next) => {
    try {
      const studentId  = req.params.id;
  
      // Check if the requester is authorized as a student
      if (req.local.type !== 'student') {
        throw new Error('You are not authorized to get skills');
      }
  
      const studentSkills = await StudentSkill.findAll({
        where: {
          studentId: studentId,
        },
        include: [{ model: Skill, as: 'Skill' }],
        attributes: {
          exclude: ['Skill.nameskill']
        }
      });
  
      res.status(200).send(studentSkills);
    } catch (err) {
      next(err);
    }
  };
  




  module.exports = {addStudentSkill,
    deleteStudentSkillById,
    updatePercentageById,
    getAllStudentSkills,
    getSkillsByStudentId}
