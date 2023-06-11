const Accepted = require('./model')
const Student = require('../student/model')
const Offer = require('../offer/model')


const getAllAcceptedData = async (req, res, next) => {
    const companyId = req.local.id
    console.log(companyId)
    try {
      if (req.local.type !== 'company') {
        throw new Error('You are not authorized to perform this action');
      }
  
      // Retrieve all data from the "Accepted" table
      const acceptedData = await Accepted.findAll({
        where: { companyId: companyId },
        include: [
          {
            model: Student,
            as: 'student',
            // attributes: ['id', 'name', 'firstname', 'email'],
          },
          {
            model: Offer,
            as: 'offer',
       
            // attributes: ['id', 'name', 'firstname', 'email'],
          },
        ],
     });
  
      res.status(200).json(acceptedData );
    } catch (error) {
      next(error);
  
    }
  };

module.exports = {getAllAcceptedData} 
