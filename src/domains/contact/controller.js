const Contact = require("./model")


const submitContactForm = async (req, res, next) => {
    try {
      // Extract the necessary data from the request body
      const { name, lastName, email, subject, message } = req.body;
  
      // Perform any necessary validations on the input data
  
      // Save the contact form submission to the database
      const submission = await Contact.create({
        name,
        lastName,
        email,
        subject,
        message,
      });
  
      res.status(200).json({ success: true, message: 'Contact form submission successful.' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      next(error);
    }
  };
  
  module.exports = { submitContactForm };
  