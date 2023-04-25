const Offer = require("./model");

const addOffer = async (req, res, next) => {
    const { title, description, technology, compagny_name, start_date, end_date, domain, location } = req.body;
  
    try {
      const newOffer = new Offer({
        title: title,
        description: description,
        technology: technology,
        compagny_name: compagny_name,
        start_date: start_date,
        end_date: end_date,
        domain: domain,
        location: location
      });
  
      const savedOffer = await newOffer.save();
      if (savedOffer) {
        return res.status(200).send(newOffer);
      }
  
    } catch (err) {
      return next(err.message);
    }
  };

  //delete offer 
  const deleteOfferById = async (req, res, next) => {
    const offerId = req.params.id;
    try {
      const deletedOffer = await Offer.destroy({ where: { id: offerId } });
      if (deletedOffer) {
        return res.status(200).send(`Offer with ID ${offerId} has been deleted`);
      } else {
        return res.status(404).send(`Offer with ID ${offerId} not found`);
      }
    } catch (err) {
      return next(err.message);
    }
  };

  // update offer 
  const updateOfferById = async (req, res, next) => {
    const offerId = req.params.id;
    const { title, description, technology, companyName, start_date, end_date, domain, location } = req.body;
    try {
      const updatedOffer = await Offer.update({
        title: title,
        description: description,
        technology: technology,
        companyName: companyName,
        start_date: start_date,
        end_date: end_date,
        domain: domain,
        location: location
      }, {
        where: { id: offerId }
      });
      if (updatedOffer) {
        const numUpdated = updatedOffer[0];
        if (numUpdated === 1) {
          return res.status(200).send(`Offer with ID ${offerId} has been updated`);
        } else {
          return res.status(404).send(`Offer with ID ${offerId} not found`);
        }
      }
    } catch (err) {
      return next(err.message);
    }
  };

  const searchInOffers =async function(req, res){
    try {
        const { domain, speciality, location } = req.query;
    let whereClause = {};
  console.log(whereClause);
    if (domain) {
      whereClause.domain = domain;
    }
  
    else if (speciality) {
      whereClause.technology = speciality;
    }
  
    else if (location) {
      whereClause.location = location;
    }
  
      const foundOffers = await Offer.findAll({ where: whereClause });
      res.json(foundOffers);
    } catch (error) {
      console.log('Error searching for offer:', error);
      res.status(500).json({ message: 'Error searching for offer' });
    }

}
  module.exports = {addOffer,deleteOfferById,updateOfferById, searchInOffers}

