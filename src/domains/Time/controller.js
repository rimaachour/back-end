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
      const time = await Time.findOne({ where: { id } });
  
      if (time) {
        await time.destroy();
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
      res.status(404).send(`time with ID ${id} not found.` );
    }
  } catch (err) {
     next(err);
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
       next(err);
    }
  };
  
  










  
  module.exports ={addTime,
    deleteTime,
    modifyTime,
    getTime}