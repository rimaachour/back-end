const subscribers = require('./model')
const Student = require('../student/model');
const Company = require('../entreprise/model');
const notification = require('../notification/model')
const { message } = require('../../helpers/studentValidation');
// Fonction pour permettre à un étudiant de s'abonner à un compte d'entreprise


const sAbonner = async (req, res, next) => {
  const companyId  = req.body.companyId;
  const studentId = req.local.id;
  try {
    if (req.local.type !== 'student') {
      throw new Error("You can't subscribe to this account");
    }

    const student = await Student.findOne({ where: { id: studentId } });
    const company = await Company.findOne({ where: { id: companyId } });

    if (!student || !company) {
      throw new Error("L'étudiant ou le profil n'existe pas");
    }

    // Check if the subscription already exists
    const subscription = await subscribers.findOne({
      where: { studentId: studentId, companyId: companyId }
    });

    if (subscription) {
      throw new Error("L'étudiant est déjà abonné à ce profil");
    }

    // Create a new subscription in the "subscribers" table
    const newSubscription = await subscribers.create({
      studentId: studentId,
      companyId: companyId
    });

    // Update the subscriberCount in the Company model
    await company.increment('SubscriberCount',{by:1});
    await company.save()

    // Emit a socket event to the company with the notification data
    // io.to(companyId).emit('newSubscriber', {
    //   studentFirstName: student.firstname,
    //   studentLastName: student.LastName
    // });

await notification.create({
    studentId: studentId,
    companyId: companyId,
    message: `The student ${student.name} subscribe to your account .`
  });




    global?.io.emit(`follow-${companyId}`,{
        message :`the student ${student.name} has followed your account.`
    });
    console.log("L'étudiant s'est abonné au profil avec succès");

    res.status(200).json("L'étudiant s'est abonné au profil avec succès");
  } catch (err) {
    next(err);
  }
};


 

  module.exports ={sAbonner}