const {Domain, Filiere} = require('../domain/model');
console.log(
  'Domain model => ', Domain,
  'Filiere model => ', Filiere,
)
//const Filiere = require('../domain/model')

const addDomain = async (req, res, next) => {
  const { name } = req.body;

  try {
    if (req.local.role != 'admin') {
        
      throw new Error('You are not authorized to add domain');
   }
    const newDomain = await Domain.create({ name });
    res.status(200).send(newDomain);
  } catch (err) {
    return next(err);
  }
};


const updateDomain = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    if (req.local.role != 'admin') {
        
      throw new Error('You are not authorized to update domain');
   }
    const domain = await Domain.findByPk(id);

    if (!domain) {
      return res.status(404).send("Domain not found");
    }

    const updatedDomain = await domain.update({ name });
    res.status(200).send(updatedDomain);
  } catch (err) {
    return next(err.message);
  }
};

const deleteDomain = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (req.local.role != 'admin') {
        
      throw new Error('You are not authorized to delete admin');
   }
    const domain = await Domain.findByPk(id);

    if (!domain) {
      throw new Error("Domain not found");
    }

    await domain.destroy();
    res.status(200).send("Domain deleted successfully");
  } catch (err) {
     next(err);
  }
};
////////////////////////////////Addfiliere//////////////////////////////////:::
const addFiliere = async (req, res, next) => {
  if (req.local.role != 'admin') {
        
    throw new Error('You are not authorized to add filier');
 }
  const { name, domainId } = req.body;

  try {
    const domain = await Domain.findByPk(domainId);
    if (!domain) {
   throw new Error("Domain not found");
    }

    const newFiliere = await Filiere.create({ name, domainId });
    res.status(200).send(newFiliere);
  } catch (err) {
     next(err);
  }
};


const updateFiliere = async (req, res, next) => {
  const { id } = req.params;
  const { name, domainId } = req.body;

  try {
    if (req.local.role != 'admin') {
        
      throw new Error('You are not authorized to update filiere');
   }
    const filiere = await Filiere.findByPk(id);

    if (!filiere) {
      return res.status(404).send("Filiere not found");
    }

    const domain = await Domain.findByPk(domainId);
    if (!domain) {
      return res.status(404).send("Domain not found");
    }

    const updatedFiliere = await filiere.update({ name, domainId });
    res.status(200).send(updatedFiliere);
  } catch (err) {
    return next(err.message);
  }
};

const deleteFiliere = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (req.local.role != 'admin') {
        
      throw new Error('You are not authorized to delete filiere');
   }
    const filiere = await Filiere.findByPk(id);

    if (!filiere) {
     throw new Error("Filiere not found");
    }

    await filiere.destroy();
    res.status(200).send("Filiere deleted successfully");
  } catch (err) {
    return next(message);
  }
};




  

  module.exports = { addDomain,deleteDomain,updateDomain,addFiliere,
    updateFiliere,
    deleteFiliere
  };
