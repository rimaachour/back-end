const Review = require('./model')
const Company = require("../entreprise/model")
const Student = require("../student/model")
const notification = require("../notification/model")


const ReviewStudentToCompany = async (req, res, next) => {
  const { companyId, rating } = req.body;
  const studentId = req.local.id;

  try {
    if (req.local.type !== 'student') {
      throw new Error("Vous n'êtes pas autorisé(e) à noter une entreprise.");
    }

    // Créer l'évaluation
    const review = await Review.create({
      rating,
      studentId,
      companyId,
      reviewer: 'student'
    });
    await notification.create({
      studentId: studentId,
      companyId: companyId,
      message: `The student  ${Student.name} less a review on your account`
    });


    // Mettre à jour le nombre d'évaluateurs de l'entreprise
    const company = await Company.findByPk(companyId);
    if (!company) {
      throw new Error('Entreprise introuvable.');
    }

    company.increment('ReviewerCount', { by: 1 });
    await company.save();

    await notification.create({
      studentId: studentId,
      companyId: companyId,
      message: `The company ${Company.name} less a review on your account.`
    });





    res.status(201).json({ review });
  } catch (error) {
    next(error);
  }
};





const ReviewCompanyToStudent = async(req,res,next)=>{
  const {studentId,rating}= req.body;
  const companyId = req.local.id;
  try {
    if (req.local.type != 'company') {
      throw new Error('You are not authorized to note student');
    }
  // Create the review
  const review = await Review.create({
    rating : rating,
   studentId : studentId,
    companyId : companyId,
    reviewer: 'company'
  });

  await notification.create({
    studentId: studentId,
    companyId: companyId,
    message: `The company ${Company.name} less review on your account.`
  });
  res.status(201).json({ review });
  } catch (error) {
  next(error);
  }
  };










module.exports ={ ReviewStudentToCompany,
  ReviewCompanyToStudent};