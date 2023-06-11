const Accepted = require('./model')

const getAllAcceptedData = async (req, res, next) => {
  try {
    if (req.local.type !== 'company') {
        throw new Error('You are not authorized to perform this action');
      }
    // Retrieve all data from the "Accepted" table
    const acceptedData = await Accepted.findAll();

    res.status(200).json({ acceptedData });
  } catch (error) {
    console.error('Error retrieving data from the "Accepted" table:', error);
    res.status(500).json({ error: 'Error retrieving data.' });
  }
};

module.exports ={getAllAcceptedData};
