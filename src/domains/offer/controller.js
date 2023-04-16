const Offer = require("./model");

const addOffer = async (req, res, next) => {
    const { Title, description, Technology, compagny_name, start_date, end_date, domain, location } = req.body;
  
    try {
      const newOffer = new Offer({
        Title: Title,
        description: description,
        Technology: Technology,
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
    const { Title, description, Technology, companyName, start_date, end_date, domain, location } = req.body;
    try {
      const updatedOffer = await Offer.update({
        Title: Title,
        description: description,
        Technology: Technology,
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

  module.exports = {addOffer,deleteOfferById,updateOfferById}

