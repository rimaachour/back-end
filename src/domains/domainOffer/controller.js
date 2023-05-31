const domainOffer = require ('./model')


const addDomainOffer = async (req, res, next) => {
  const { name } = req.body;
  
  try {
    if (req.local.role != 'admin') {
        
      throw new Error('You are not authorized to add domain');
    }
    const domain1 = new domainOffer({ name });
    const savedDomain = await domain1.save();

    if (savedDomain) {
      res.status(200).send(savedDomain);
    }
  } catch (err) {
     next(err);
  }
};




  const updateDomainOffer = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
  
    try {
      if (req.local.role != 'admin') {
          
        throw new Error('You are not authorized to update domain');
     }
      const domainOffer = await domainOffer.findByPk(id);
  
      if (!domainOffer) {
         res.status(404).send("Domain not found");
      }
  
      const updateDomainOffer = await domainOffer.update({ name });
      res.status(200).send(updateDomainOffer);
    } catch (err) {
      return next(err);
    }
  };

  const deleteDomainOffer = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      if (req.local.role != 'admin') {
          
        throw new Error('You are not authorized to delete admin');
     }
      const domain = await domainOffer.findByPk(id);
  
      if (!domain) {
        throw new Error("Domain not found");
      }
  
      await domain.destroy();
      res.status(200).send("Domain  deleted successfully");
    } catch (err) {
       next(err);
    }
  };

  const getDomain = async (req, res, next) => {
    try {
      if (req.local.type !== 'company' && req.local.type !== 'student')  {
          
        throw new Error('You are not authorized to  get location');}
      const Domain = await domainOffer.findAll();
  
      if (Domain) {
        res.status(200).send(Domain);
      } else {
        res.status(404).send('No Domainfound.');
      }
    } catch (err) {
       next(err);
    }
  };











  module.exports={
    addDomainOffer,
    updateDomainOffer,
    deleteDomainOffer,
    getDomain
  }