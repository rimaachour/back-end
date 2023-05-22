const SavedOffer = require('./model')

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

module.exports = {
    saveOffer
}