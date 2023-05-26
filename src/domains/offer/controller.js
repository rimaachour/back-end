const { ERROR } = require("sqlite3");
const { error } = require("../../helpers/studentValidation");
const Offer = require("./model");
const time = require("../Time/controller");
const location = require("../loaction/model")
const addOffer = async (req, res, next) => {
  const { title, description, technology, internship_level, domain, duration, location, status, start_date, end_date, type } = req.body;

  try {
    // Check if the user's role is company
    //console.log(req.local.ty);
    if (req.local.type != 'company') {

      throw new Error('You are not authorized to add offers');
    }

    const newOffer = new Offer({
      title: title,
      description: description,
      technology: technology,
      company_name: req.local.name,
      start_date: start_date,
      end_date: end_date,
      duration: duration,
      domain: domain,
      location: location,
      companyId: req.local.id,
      status: status,
      internship_level: internship_level,
      type: type



    });

    const savedOffer = await newOffer.save();
    if (savedOffer) {
      res.status(200).send(newOffer);
    }

  } catch (err) {
    next(err);
  }
};


//delete offer 
const deleteOfferById = async (req, res, next) => {
  const offerId = req.params.id;
  try {
    if (req.local.type != 'company') {
      throw new Error('You are not authorized to delete offers');
    }

    const deletedOffer = await Offer.destroy({ where: { id: offerId } });
    if (!deletedOffer) {
      throw new Error(`Offer with ID ${offerId} not found`);
    }
    // if (req.local.type !== deletedOffer.companyId) {
    //   throw new Error('you cannot delete this offer');
    // }
    res.status(200).send(`Offer with ID ${offerId} has been deleted`);
  } catch (err) {
    next(err);
  }
};



// update offer 
const updateOfferById = async (req, res, next) => {
  const offerId = req.params.id;
  const { title, description, technology, internship_level, domain, duration, location, status, start_date, end_date, type } = req.body;

  try {
    if (req.local.type != 'company') {
      throw new Error('You are not authorized to update this offer');
    }

    const offer = await Offer.findByPk(offerId);
    if (!offer) {
      throw new Error(`Offer with ID ${offerId} not found`);
    }

    if (req.local.id !== offer.companyId) {
      throw new Error('You are not authorized to update this offer');
    }

    const updatedOffer = await offer.update({
      title: title,
      description: description,
      technology: technology,
      company_name: req.local.name,
      start_date: start_date,
      end_date: end_date,
      duration: duration,
      domain: domain,
      location: location,
      companyId: req.local.id,
      status: status,
      internship_level: internship_level,
      type: type

    });

    res.status(200).send(updatedOffer);

  } catch (err) {
    next(err);
  }
};

////////////////////functiotogetalloffers//////////////
// get all offers
const getOffers = async (req, res, next) => {
  try {
    if (req.local.type != 'student') {
      throw new Error('You are not authorized to see offers');
    }
    const offers = await Offer.findAll({
      where: { status: 'active' },
      attributes: ['title', 'description', 'technology', 'company_name', 'duration', 'domain', 'location', 'companyId', 'status', 'internship_level', 'type']
    });
    res.status(200).send(offers);
  } catch (err) {
    next(err);
  }
};


//getOffersByID 
const getOfferById = async (req, res, next) => {
  const offerId = req.params.id;
  try {
    if (req.local.type != 'student') {
      throw new Error('You are not authorized to see offers');
    }

    const foundOffer = await Offer.findOne({ where: { id: offerId } });
    if (!foundOffer) {
      throw new Error(`Offer with ID ${offerId} not found`);
    }
    res.status(200).send(foundOffer);
  } catch (err) {
    next(err);
  }
};


///////::getOfferByComapnyI///////////////////////////////////////////////////////////////////////////


const getOffersByCompanyId = async (req, res, next) => {
  const companyId = req.params.id;
  try {
    if (req.local.type !== 'company') {
      throw new Error('You are not authorized to see offers');
    }

    const foundOffers = await Offer.findAll({
      where: {
        companyId: companyId
      }
    });

    if (foundOffers.length === 0) {
      throw new Error(`No offers found for company with ID ${companyId}`);
    }

    res.status(200).json(foundOffers);
  } catch (err) {
    next(err);
  }
};


const searchOffers = async (req, res, next) => {
  const { time } = req.query;

  try {
    if (req.local.type != 'student ') {
      throw new Error('You are not authorized to search of offer ');
    }

    let offers;

    if (time) {
      offers = await Offer.findAll({
        where: {
          time: time.toLowerCase() // Assurez-vous que les valeurs du tableau "time" sont en minuscules dans votre base de données
        }
      });
    } else {
      offers = await Offer.findAll();
    }

    res.status(200).json(offers);
  } catch (err) {
    next(err);
  }
};





/////////////////////////////////////////////////////////////////////////////////////////////////////////:::


//getPopularOfferDiscover

  const getPopularOfferDiscover = async function (req, res, next) {
    try {
      const offers = await Offer.findAll({
        where: { popular: true },
        attributes: ['title', 'description', 'technology', 'company_name'],
        limit: 6,
      });
      res.status(200).json(offers);
    } catch (error) {
      next(error)


    }
  };
const getPopularofferDiscoverDetails = async function (req,res,next){
  const offerId = req.params.id;
try{
if ((req.local.type == 'student')|| (req.local.type =='company')){
  throw new Error('You are not authorized to see offers');
}
const offers = await Offer.findAll({
  where: { popular: true },
  limit: 6,
});
res.status(200).json(offers);
} catch (error) {
next(error);
}
};














module.exports = {
  addOffer,
  deleteOfferById,
  updateOfferById,
  searchOffers,
  getOffers,
  getOfferById,
  getOffersByCompanyId,
  getPopularOfferDiscover,
  getPopularofferDiscoverDetails
}


