const Offer = require("./model");

const addOffer = async (req, res, next) => {
    const { Title, description, Technology, compagny_name, start_date, end_date, domain, location } = req.body;
  
    try {
      const newOffer = new Offer({
        Title: Title,
        description: description,
        Technology: Technology,
        companyName: compagny_name,
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

  module.exports = {addOffer}

