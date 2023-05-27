const SavedOffer = require('./model')
const Offer = require("../offer/model")




const saveOffer = async (req, res, next) => {
  
  const studentId = req.local.id;
  const {offerId} = req.body;
    try {
      if (req.local.type != 'student') {
        throw new Error('You are not authorized to save offers');
      }
  
  
      // Check if the offer is already saved by the student
      const existingSavedOffer = await SavedOffer.findOne({
        where: {
          studentId,
          offerId,
        },
      });
  
      if (existingSavedOffer) {
        throw new Error('Offer already saved by the student.');
      }
  
      // Create a new saved offer entry
      await SavedOffer.create({
        studentId,
        offerId,
      });
  
      res.status(200).json({ message: 'Offer saved successfully.' });
    } catch (error) {
      next(error);
    }
  };

  const getSavedOfferById = async (req, res, next) => {
    const savedOfferId = req.params.id;

    try {
      const savedOffer = await SavedOffer.findOne({
        where: {
          id: savedOfferId,
        },
        include: Offer, // Specify the associated model
      });

      if (!savedOffer) {
        throw new Error('Saved offer not found');
      }

      res.status(200).json(savedOffer);
    } catch (error) {
      next(error);
    }
  };

  const getSavedOffer = async (req, res, next) => {
    const studentId = req.local.id;
  
    try {
      if (req.local.type !== 'student') {
        throw new Error('You are not authorized to view saved offers');
      }
  
      const savedOffers = await SavedOffer.findAll({
        where: {
          studentId,
        },
        include: Offer, // Specify the associated model
      });
  
      if (savedOffers.length === 0) {
        throw new Error('No saved offers found');
      }
  
      res.status(200).json(savedOffers);
    } catch (error) {
      next(error);
    }
  };
  
  const removeSavedOffer = async (req, res, next) => {
    const savedOfferId = req.params.id;
  
    try {
      const savedOffer = await SavedOffer.findByPk(savedOfferId);
  
      if (!savedOffer) {
        throw new Error('Saved offer not found');
      }
  
      await savedOffer.destroy();
  
      res.status(200).json({ message: 'Saved offer removed successfully.' });
    } catch (error) {
      next(error);
    }
  };


module.exports = {
    saveOffer,
    getSavedOfferById,
    getSavedOffer,
    removeSavedOffer
}