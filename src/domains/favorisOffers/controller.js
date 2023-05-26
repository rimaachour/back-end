const favorisOffers = require('./model')
const offer = require("../offer/controller")
const  saveFavorisOffer = async (req,res ,next) =>{
    const { offerId } = req.body;

    try {
        if (req.local.type != 'student') {
            throw new Error('You are not authorized to save offer');
          }
      const favorisOffer = await favorisOffers.create({ offerId });
      console.log('Favoris offer saved successfully:', favorisOffer);
      res.status(200).json({ favorisOffer });
    } catch (error) {
      console.error('Error saving favoris offer:', error);
      next(error);
    }
}





module.exports = {saveFavorisOffer}