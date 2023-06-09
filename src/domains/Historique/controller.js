const Historique = require('./model');
const Offre = require("../offer/model");
const Student = require('../student/model');
const Company = require('../entreprise/model');
const Offer = require('../offer/model');
const notification = require('../notification/model');
const applyOffre = async (req, res, next) => {
  const offerId = req.params.id;
  const studentId = req.local.id;
  const companyId = req.local.id;


  try {
    if (req.local.type != 'student') {
      throw new Error('You are not authorized to apply offers');
    }

    const offre = await Offre.findOne({ where: { id: offerId } });
    const etudiant = await Student.findOne({ where: { id: studentId } });
    const company = await Company.findOne({ where: { id: offre.companyId } });


    if (!offre || !etudiant) {
      throw new Error("'L'offre ou l'étudiant n'existe pas.'");
    }

    await Historique.create({
      studentId: studentId,
      offerId: offerId,
      companyId: companyId,


    });
   // Create a new notification
  await notification.create({
    studentId: studentId,
    companyId: companyId,
    message: `The student ${etudiant.name} applied to your offer ${offre.title}.`
  });
    // Envoyer une notification à l'entreprise (par exemple, un e-mail)
    // Utilisez la méthode appropriée pour envoyer une notification à l'entreprise

    // Set up Socket.IO server


    // Emit a 'notification' event to the company
    global?.io.emit("apply-${companyId}", {
      //message: the student ${etudiant.name} applied you offer ${offre.title}.
    });

    res.json({ message: 'Postulation effectuée avec succès.' });
  } catch (error) {
    next(error);
  }
};
  
  async function getAppliedStudents(req, res, next) {
    const companyId = req.local.id;
  
    try {
      if (req.local.type != 'company') {
        throw new Error('You are not authorized to getprofileStudent for an offer');
      }
      const appliedStudents = await Historique.findAll({
        where: { companyId },
       include: [
          {
            model: Student,
            as: 'student',
            attributes: ['id', 'name', 'firstname', 'email'],
           
          },
          {
            model: Offer,
            as: 'offer',
            //attributes: ['id', 'name', 'firstname', 'email'],
           
          },
         
        ], 
      });
  
      res.json({appliedStudents});
    } catch (error) {
      console.error('Error retrieving applied students:', error);
      next(error);
    }
  }
  
  






const getAppliedOffersCount = async (req, res, next) => {
  try {
    if (req.local.type !== 'company') {
      throw new Error('You are not authorized to access this information');
    }

    const appliedOffersCount = await Historique.count();
    res.json({ count: appliedOffersCount });
  } catch (error) {
    next(error);
  }
};
  
  module.exports = {applyOffre,
    getAppliedOffersCount,
//getAppliedOffer,
 getAppliedStudents
  };
  