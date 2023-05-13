// const {Filiere, Domain} = require('../domain/model');


// const addFiliere = async (req, res, next) => {
//   const { name, domainId } = req.body;

//   try {
//     const domain = await Domain.findByPk(domainId);
//     if (!domain) {
//    throw new Error("Domain not found");
//     }

//     const newFiliere = await Filiere.create({ name, domainId });
//     res.status(200).send(newFiliere);
//   } catch (err) {
//      next(err);
//   }
// };


// const updateFiliere = async (req, res, next) => {
//   const { id } = req.params;
//   const { name, domainId } = req.body;

//   try {
//     const filiere = await Filiere.findByPk(id);

//     if (!filiere) {
//       return res.status(404).send("Filiere not found");
//     }

//     const domain = await Domain.findByPk(domainId);
//     if (!domain) {
//       return res.status(404).send("Domain not found");
//     }

//     const updatedFiliere = await filiere.update({ name, domainId });
//     res.status(200).send(updatedFiliere);
//   } catch (err) {
//     return next(err.message);
//   }
// };

// const deleteFiliere = async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     const filiere = await Filiere.findByPk(id);

//     if (!filiere) {
//       return res.status(404).send("Filiere not found");
//     }

//     await filiere.destroy();
//     res.status(200).send("Filiere deleted successfully");
//   } catch (err) {
//     return next(err.message);
//   }
// };


//  module.exports = { addFiliere,
//   updateFiliere,
//   deleteFiliere
//  };