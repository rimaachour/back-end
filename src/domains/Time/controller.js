const Time = require('./model')

const addTime = async (req, res, next) => {
    const { name } = req.body;
  
    try {
      if (req.local.role != 'admin') {
          
        throw new Error('You are not authorized to add skill');
      }
      const newTime = new Time({ name });
      const savedTime = await newTime.save();
  
      if (savedTime) {
        res.status(200).send(newTime);
      }
    } catch (err) {
       next(err);
    }
  };
////////////////////////Delete/////////////

const deleteTime = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      if (req.local.role != 'admin') {
          
        throw new Error('You are not authorized to delete skill ');}
      const Time = await Time.findByPk(id);
  
      if (Time) {
        await Time.destroy();
        res.status(200).send(`Time with ID ${id} deleted successfully.`);
      } else {
        res.status(404).send(`Time with ID ${id} not found.`);
      }
    } catch (err) {
       next(err);
    }
  };
  
  ////////////////modifyTime /////////////////

const modifyTime = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    if (req.local.role != 'admin') {
        
      throw new Error('You are not authorized to update Time');}
    const updatedTime = await Time.update({name}, { where: { id } });
    if (updatedTime[0] !== 0) {
      const time = await Time.findByPk(id);
      res.status(200).send(time);
    } else {
      res.status(404).send({ message: `time with ID ${id} not found.` });
    }
  } catch (err) {
     next(message);
  }
};
//////////////getTime/////////////////

const getTime = async (req, res, next) => {
    try {
      if (req.local.role != 'admin') {
          
        throw new Error('You are not authorized to  get time');}
      const time = await Time.findAll();
  
      if (time) {
        res.status(200).send(time);
      } else {
        res.status(404).send('No time found.');
      }
    } catch (err) {
       next(message);
    }
  };
  
  










  
  module.exports ={addTime,
    deleteTime,
    modifyTime,
    getTime}