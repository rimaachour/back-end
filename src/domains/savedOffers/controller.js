const SavedOffer = require("../offer/model")

const saveOffer = async (req, res, next) => {
    try {
        const { studentId, offerId } = req.body;

        // Check if the offer is already saved by the student
        const existingSavedOffer = await SavedOffer.findOne({
            where: {
                studentId,
                offerId
            }
        });

        if (existingSavedOffer) {
            throw new Error('Offer already saved by the student.' );
        }

        // Create a new saved offer entry
        await SavedOffer.create({
            studentId,
            offerId
        });

        res.status(200).json({ message: 'Offer saved successfully.' });
    } catch (error) {
        console.error('Error saving offer:', error);
        next(error);
    }
};

module.exports = {
    saveOffer
}