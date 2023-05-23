const Historique = require('./model');
const Offre = require("../offer/model");
const Student = require('../student/model');
const Company = require('../entreprise/model');

const applyOffre = async (req, res, next) => {
    const offerId = req.params.id;
    const studentId = req.local.id;
  
    try {
      if (req.local.type != 'student') {
        throw new Error('You are not authorized to add offers');
      }
  
      const offre = await Offre.findOne({ where: { id: offerId } });
      const etudiant = await Student.findOne({ where: { id: studentId } });
  
      if (!offre || !etudiant) {
        throw new Error('L\'offre ou l\'étudiant n\'existe pas.');
      }
  
      await Historique.create({
        studentId: studentId,
        offerId: offerId,
      });
  
      const company = await Company.findOne({ where: { id: offre.companyId } });
      // Envoyer une notification à l'entreprise (par exemple, un e-mail)
      // Utilisez la méthode appropriée pour envoyer une notification à l'entreprise
  
      // Set up Socket.IO server

  
      // Emit a 'notification' event to the company
      global?.io.to(company.id).emit('notification', {
        message: 'Un étudiant a postulé à votre offre d\'emploi.',
        studentId: studentId,
        offerId: offerId,
      });
  
      res.json({ message: 'Postulation effectuée avec succès.' });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = {applyOffre};
  