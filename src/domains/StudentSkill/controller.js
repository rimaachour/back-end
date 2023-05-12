const StudentSkill = require('./model');
const Student = require('../student/model')

const addStudentSkill = async (req, res, next) => {
    const { skillId, percentage } = req.body;
    const studentId = req.params.studentId;
    try {
        const userpayload = req.local;

      const newStudentSkill = await StudentSkill.create({
        skillId: skillId,
        percentage: percentage,
        studentId: studentId
      });
      res.status(201).send(newStudentSkill);
    } catch (err) {
      next(err);
    }
  };

  const deleteStudentSkillById = async (req, res, next) => {
    const studentSkillId = req.params.id;

    try {
        const userpayload = req.local;
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
    try {
        const userpayload = req.local;

      const studentSkills = await StudentSkill.findAll();
      res.status(200).send(studentSkills);
    } catch (err) {
      next(err);
    }
  };
  module.exports = {addStudentSkill,
    deleteStudentSkillById,
    updatePercentageById,
    getAllStudentSkills}
