const location = require ('./model')

const addlocation = async (req, res, next) => {
    const { name } = req.body;
  
    try {
      if (req.local.role != 'admin') {
          
        throw new Error('You are not authorized to add location');
      }
      const newlocation = new location({ name });
      const savedlocation = await newlocation.save();
  
      if (savedlocation) {
        res.status(200).send(newlocation);
      }
    } catch (err) {
       next(err);
    }
  };

/////////////Delete/////////////////////////////

const Deletelocation = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      if (req.local.role != 'admin') {
          
        throw new Error('You are not authorized to delete skill ');}
      const location = await location.findByPk(id);
  
      if (location) {
        await location.destroy();
        res.status(200).send(`location with ID ${id} deleted successfully.`);
      } else {
        res.status(404).send(`location with ID ${id} not found.`);
      }
    } catch (err) {
       next(err);
    }
  };
  ////////////////updateLocaation////////////////::
  const modifylocation = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
  
    try {
      if (req.local.role != 'admin') {
          
        throw new Error('You are not authorized to update location ');}
      const updatedlocation = await location.update({name}, { where: { id } });
      if (updatedlocation[0] !== 0) {
        const location = await location.findByPk(id);
        res.status(200).send(location);
      } else {
        res.status(404).send({ message: `location with ID ${id} not found.` });
      }
    } catch (err) {
       next(message);
    }
  };
  
  //////////////getLocation////////////////////

  const getLocation = async (req, res, next) => {
    try {
      if (req.local.role != 'admin') {
          
        throw new Error('You are not authorized to  get location');}
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
  
  module.exports ={addlocation,
    modifylocation,
    getLocation,
    Deletelocation}