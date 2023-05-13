const Admin = require("./model");
const Offer = require("../offer/model")
async function createAdmin(adminData) {
    try {
      const admin = await Admin.create(adminData);
      return admin;
    } catch (error) {
      throw new Error('Failed to create admin');
    }
  }
  
  // Get all admins
  async function getAdmins() {
    try {
      const admins = await Admin.findAll();
      return admins;
    } catch (error) {
      throw new Error('Failed to get admins');
    }
  }
  
  // Get admin by ID
  async function getAdminById(adminId) {
    try {
      const admin = await Admin.findByPk(adminId);
      return admin;
    } catch (error) {
      throw new Error('Failed to get admin');
    }
  }
  
  // Update an admin
  async function updateAdmin(adminId, adminData) {
    try {
      const admin = await Admin.findByPk(adminId);
      if (admin) {
        await admin.update(adminData);
        return admin;
      }
      throw new Error('Admin not found');
    } catch (error) {
      throw new Error('Failed to update admin');
    }
  }
  
  // Delete an admin
  async function deleteAdmin(adminId) {
    try {
      const admin = await Admin.findByPk(adminId);
      if (admin) {
        await admin.destroy();
        return true;
      }
      throw new Error('Admin not found');
    } catch (error) {
      throw new Error('Failed to delete admin');
    }
  }
  const updateOfferStatus = async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      if (req.local.role !== 'admin') {
        throw new Error('You are not authorized to update offer status');
      }
  
      const offer = await Offer.findOne({ where: { id } });
  
      if (!offer) {
        throw new Error('Offer not found');
      }
  
      // Update the offer status
      offer.status = status;
      await offer.save();
  
      res.status(200).send('Offer status updated successfully');
    } catch (err) {
      return next(err);
    }
  };
  
  



  
  module.exports = {
    createAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    updateOfferStatus
  };
