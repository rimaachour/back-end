const favorisOffers = require('./model')
const Offer = require("../offer/model")


const saveFavorisOffer = async (req, res, next) => {
  const studentId = req.local.id;

  const { offerId } = req.body;

  try {
    if (req.local.type != 'student') {
      throw new Error('You are not authorized to save offer');
    }
    const existingfavorisOffer = await favorisOffers.findOne({
      where: {
        studentId,
        offerId,
      },
    });

    if (existingfavorisOffer) {
      throw new Error('Offer already saved by the student.');
    }

    // Create a new saved offer entry
    await favorisOffers.create({
      studentId,
      offerId,
    });

    res.status(200).json({ message: 'Offer favorisé successfully.' });
  } catch (error) {
    next(error);
  }
};



const getfavorisOffer = async (req, res, next) => {
  const studentId = req.local.id;

  try {
    if (req.local.type !== 'student') {
      throw new Error('You are not authorized to view saved offers');
    }

    const FavorisOffers = await favorisOffers.findAll({
      where: {
        studentId,
      },
      include: {
        model: Offer, // Specify the associated model (assuming it is named "offer")
      },
    });

    if (FavorisOffers.length === 0) {
      throw new Error('No saved offers found');
    }

    res.status(200).json(FavorisOffers);
  } catch (error) {
    next(error);
  }
};


const removeFavoriteOffers = async(req,res,next)=>{
  const favoriteOfferId=req.params.id;
  try{
    const favoriteOffer = await favorisOffers.findByPk(savedOfferId);
    if(!favoriteOffer){
      throw new Error('favorite offer not found');

    }
    await favoriteOffer.destroy();
    res.status(200).json({ message: 'Saved offer removed successfully.' });
  } catch (error) {
    next(error);
  }
}


module.exports = {
  saveFavorisOffer,
  getfavorisOffer,
  removeFavoriteOffers
}