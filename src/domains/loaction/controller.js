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
    if (req.local.role !== 'admin') {
      throw new Error('You are not authorized to delete skill');
    }

    const Location = await location.findOne({ where: { id } });

    if (Location) {
      await Location.destroy();
      res.status(200).send(`Location with ID ${id} deleted successfully.`);
    } else {
      res.status(404).send(`Location with ID ${id} not found.`);
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
      if (req.local.role !== 'admin') {
        throw new Error('You are not authorized to update location');
      }
      
      const updatedLocation = await location.update({ name }, { where: { id } });
      
      if (updatedLocation[0] !== 0) {
        const Location = await location.findByPk(id);
        res.status(200).send(Location);
      } else {
        res.status(404).send(`Location with ID ${id} not found.`);
      }
    } catch (err) {
      next(err);
    }
  };
  
  //////////////getLocation////////////////////

  const getLocation = async (req, res, next) => {
    try {
      if (req.local.type !== 'company' && req.local.type !== 'student') {
          
        throw new Error('You are not authorized to  get location');}
      const Location = await location.findAll();
  
      if (Location) {
        res.status(200).send(Location);
      } else {
        res.status(404).send('No time found.');
      }
    } catch (err) {
       next(err);
    }
  };
  
  module.exports ={
    addlocation,
    modifylocation,
    getLocation,
    Deletelocation}