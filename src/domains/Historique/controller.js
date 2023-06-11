const Historique = require('./model');
const Offre = require("../offer/model");
const Student = require('../student/model');
const Company = require('../entreprise/model');
const Offer = require('../offer/model');
const notification = require('../notification/model');
const {Op}= require ('sequelize');
const Accepted = require('../Accepted/model')
const applyOffre = async (req, res, next) => {
  const offerId = req.params.id;
  const studentId = req.local.id;
  const companyId = req.body.companyId;

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
    await company.increment('AppliedOfferCount',{by:1});
    await company.save()
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
    if (req.local.type !== 'company') {
      throw new Error('You are not authorized to get profileStudent for an offer');
    }

    const appliedStudents = await Historique.findAll({
      where: { companyId },
      include: [
        {
          model: Student,
          as: 'student',
         // attributes: ['id', 'name', 'firstname', 'email'],

        },
        {
          model: Offer,
          as: 'offer',
          //attributes: ['id', 'name', 'firstname', 'email'],
        },
      ],
    });

    res.json({ appliedStudents });
  } catch (error) {
    console.error('Error retrieving applied students:', error);
    next(error);
  }
}
async function rejectApplication(req, res, next) {
  const companyId = req.local.id;
  const offerId = req.body.offerId;
  const studentId = req.body.studentId;

  try {

    if (req.local.type !== 'company') {
      throw new Error('You are not authorized to access this information');
    }


    const application = await Historique.findOne({
      where: {

        offerId: offerId,
        studentId:studentId,
        Status: 'pending',
      },
    });

    if (!application) {
    throw new Error ( 'Application not found or already rejected.' );
    }

    application.Status = 'refused';
    await application.save();

    res.status(200).json({ message: 'Application rejected successfully.' });
  } catch (error) {

 next(error)
  }
}

const getAppliedOffersByStudentId = async (req, res, next) => {
  const studentId= req.local.id;

  try {
    if (req.local.type !== 'student') {
      throw new Error('You are not authorized to access this information');
    }

    const appliedOffers = await Historique.findAll({
      where: { studentId },
      include: [
        {
          model: Offer,
          as: 'offer',
          //attributes: ['id', 'title', 'status'], // Include other attributes you want to display
        },
      ],
    });

    res.json({ appliedOffers });
  } catch (error) {
    next(error);
  }
};

async function updateApplicationStatus(req, res, next) {
   const studentId = req.body.studentId;
  const offerId= req.body.offerId;
  const companyId = req.local.id

  try {

    if (req.local.type !== 'company') {
      throw new Error('You are not authorized to access this information');
    }

    // Update the accepted student's application status to "accepted"
    await Historique.update(
      { Status: 'accepted' },
      {
        where: {
          studentId:studentId,
          offerId: offerId,
          

        },
      }
    );

    await Accepted.create({
      studentId: studentId,
      offerId: offerId,
      companyId : companyId
    });

    // Update the accepted student's application status to "accepted"
    await Historique.update(
      { Status: 'refused' },
      {
        where: {
          studentId:{[Op.not]:studentId},
          offerId: offerId,

        },
      }
    );





    res.status(200).json({ message: 'Application status updated successfully.' });
  } catch (error) {
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

module.exports = {
  applyOffre,
  getAppliedOffersCount,
  //getAppliedOffer,
  getAppliedStudents,
  getAppliedOffersByStudentId,
  rejectApplication,
  updateApplicationStatus
};
