const Admin = require("./model");

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
  
  module.exports = {
    createAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin
  };