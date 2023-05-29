const { ERROR } = require("sqlite3");
const { error } = require("../../helpers/studentValidation");
const Offer = require("./model");
const location= require("../loaction/model")
const domainOffer = require("../domainOffer/model");
const { Op } = require('sequelize');



const addOffer = async (req, res, next) => {
const { title, description, technology, internship_level, status, start_date, end_date, domainOfferId, locationId, type } = req.body;

  try {
    // Check if the user's role is company
    if (req.local.type != 'company') {
      throw new Error('You are not authorized to add offers');
    }

    const foundDomain = await domainOffer.findOne({ where: { id: domainOfferId } });
      const foundLocation = await location.findOne({ where: { id: locationId } });
    

    if (!foundDomain || !foundLocation) {
      throw new Error('Invalid domain, location, or time');
    }
    // Calculate duration in months
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();
    const durationInMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;

    const newOffer = await Offer.create({
      title: title,
      description: description,
      technology: technology,
      company_name: req.local.name,
      start_date: start_date,
      end_date: end_date,
      duration: durationInMonths,
      companyId: req.local.id,
      locationId: locationId,
      type: type,
      domainOfferId: domainOfferId,
      status: status,
      internship_level: internship_level,
    });

    res.status(200).send(newOffer);
  } catch (err) {
    next(err);
  }
};




//delete offer 
const deleteOfferById = async (req, res, next) => {
 
    const offerId  = req.params.id;
  
    try {
      // Check if the user's role is company
      if (req.local.type != 'company') {
        throw new Error('You are not authorized to delete offers');
      }
  
      const foundOffer = await Offer.findOne({ where: { id: offerId } });
  
      if (!foundOffer) {
        throw new Error('Offer not found');
      }
  
      await foundOffer.destroy();
  
      res.status(200).send({ message: 'Offer deleted successfully' });
    } catch (err) {
      next(err);
    }
  };
  



// update offer 
const updateOffer = async (req, res, next) => {
  const offerId  = req.params.id;
  const { title, description, technology, internship_level, status, start_date, end_date, domainOfferId, locationId, type } = req.body;

  try {
    // Check if the user's role is company
    if (req.local.type !== 'company') {
      throw new Error('You are not authorized to update offers');
    }

    const foundOffer = await Offer.findOne({ where: { id: offerId } });

    if (!foundOffer) {
      throw new Error('Offer not found');
    }

    // Update the offer properties
    foundOffer.title = title;
    foundOffer.description = description;
    foundOffer.technology = technology;
    foundOffer.internship_level = internship_level;
    foundOffer.status = status;
    foundOffer.start_date = start_date;
    foundOffer.end_date = end_date;
    foundOffer.domainOfferId = domainOfferId;
    foundOffer.locationId = locationId;
    foundOffer.type = type;

    // Calculate duration in months
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();
    const durationInMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;

    foundOffer.duration = durationInMonths;

    await foundOffer.save();

    res.status(200).send(foundOffer);
  } catch (err) {
    next(err);
  }
};



////////////////////functiotogetalloffers//////////////
// get all offers


const getOffers = async (req, res, next) => {
  try {
    if (req.local.type !== 'student') {
      throw new Error('You are not authorized to see offers');
    }

    const offers = await Offer.findAll({
      where: { status: 'active' },
      include: [
        { model: domainOffer, as: 'domainOffer' },
        { model: location, as: 'location' },

      ],
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
    if (req.local.type !== 'student') {
      throw new Error('You are not authorized to see offers');
    }

    const offer = await Offer.findByPk(offerId, {
      include: [
        { model: domainOffer, as: 'domainOffer' },
        { model: location, as: 'location' },

      ],
    });

    if (!offer) {
      throw new Error('Offer not found');
    }

    res.status(200).send(offer);
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

    const offers = await Offer.findAll({
      where: {
        companyId: companyId,
      },
      include: [
        { model: domainOffer, as: 'domainOffer' },
        { model: location, as: 'location' },

      ],
    });

    if (offers.length === 0) {
      throw new Error(`No offers found for company with ID ${companyId}`);
    }

    res.status(200).json(offers);
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


const getPopularofferDiscoverDetails = async function (req, res, next) {
  const offerId = req.params.id;
  try {
    if ((req.local.type != 'student')||( req.local.type != 'company')){
      throw new Error('You are not authorized to see offers');
    }

    const offers = await Offer.findAll({
      where: { popular: true },
      limit: 6,
      include: [
        {
          model: domainOffer,
          as: 'domainOffer',
        },
        {
          model: location,
          as: 'location',
        },
      ],
    });

    res.status(200).json(offers);
  } catch (error) {
    next(error);
  }
};




const getPopularOffers = async (req, res, next) => {
  try {
    if (req.local.type !== 'student') {
      throw new Error('You are not authorized to see offers');
    }

    const offers = await Offer.findAll({
      where: {
        status: 'active',
        popular: true,
      },
      include: [
        { model: domainOffer, as: 'domainOffer' },
        { model: location, as: 'location' },

      ],
    });

    // Shuffle the offers array randomly
    const shuffledOffers = offers.sort(() => Math.random() - 0.5);

    // Take the first 3 offers from the shuffled array
    const randomOffers = shuffledOffers.slice(0, 3);

    res.status(200).json(randomOffers);
  } catch (error) {
    next(error);
  }
};













module.exports = {
  addOffer,
  deleteOfferById,
  updateOffer,
  searchOffers,
  getOffers,
  getOfferById,
  getOffersByCompanyId,
  getPopularOfferDiscover,
  getPopularofferDiscoverDetails,
  getPopularOffers
}


