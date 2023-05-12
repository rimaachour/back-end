const Skill = require('./model');



const addSkill = async (req, res, next) => {
  const { name } = req.body;

  try {
    const newSkill = new Skill({ name });
    const savedSkill = await newSkill.save();

    if (savedSkill) {
      res.status(200).send(newSkill);
    }
  } catch (err) {
    return next(err.message);
  }
};
const modifySkill = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedSkill = await Skill.update({name}, { where: { id } });
    if (updatedSkill[0] !== 0) {
      const skill = await Skill.findByPk(id);
      res.status(200).send(skill);
    } else {
      res.status(404).send({ message: `Skill with ID ${id} not found.` });
    }
  } catch (err) {
    return next(err.message);
  }
};

const deleteSkill = async (req, res, next) => {
  const { id } = req.params;

  try {
    const skill = await Skill.findByPk(id);

    if (skill) {
      await skill.destroy();
      res.status(200).send(`Skill with ID ${id} deleted successfully.`);
    } else {
      res.status(404).send(`Skill with ID ${id} not found.`);
    }
  } catch (err) {
    return next(err.message);
  }
};


const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.findAll();

    if (skills) {
      res.status(200).send(skills);
    } else {
      res.status(404).send('No skills found.');
    }
  } catch (err) {
    return next(err.message);
  }
};



module.exports = { addSkill,
  getSkills, 
modifySkill,deleteSkill, };

