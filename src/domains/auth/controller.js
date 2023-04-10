const User = require ("../auth/model");
const Student= require ("../student/model")
const Entreprise = require("../entreprise/model")
// register 
const bcrypt = require('bcrypt');
const { mail } = require("../../helpers/mailer");
const {generateOTP} =require("../../helpers/OTP");
const {sendOTPEmail}=require("../../helpers/OTP");







  // sign in


  
  const signIn = async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      const user = await Student.findOne({ email });
  
      if (!user) {
        throw new Error('Adresse e-mail invalide');
      }
  
      const isPasswordMatch = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatch) {
        throw new Error('Mot de passe invalide');
      }

      return res.status(200).send({ message: 'Connexion réussie', user });
  
    } catch (err) {

      return next(err.message);
    }
  };

//ForgetPassword
const forgotPassword = async (req, res, next) => {

  const { email } = req.body;
  console.log(email)

  try {
    // Find the user by email
    const user = await Student.findOne({
      where:{email:email}
    })
    console.log(user)
    if (!user) {
      throw new Error('Adresse e-mail invalide');
    }
    const token = Math.random().toString(36).substring(7);
    console.log(token)
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save()
    const resetLink = `<p>Please click <a href="">here</a> to reset your password.</p>`

    await mail(user.email, 'Password Reset ',resetLink)
    
    res.status(200).json({ok: true, message: 'Password reset link sent' });

  } catch (err) {
    return next(err.message);
  }
}

  const restePassword = async (req, res, next) => {
    const { password } = req.body;
    const { token } = req.params;
    try{
    // Find the user by email
    const user = await Student.findOne({
      where:{resetPasswordToken:token}
    })
    if (!user) {
      return res.status(404).json({ error: 'Invalid password reset token' });
  }
  if ( Date.now() > this.resetPasswordExpires){
      return res.status(400).json({ error: 'Password reset token has expired' });

  }
  const pass=  await bcrypt.hash(password, 10);
  user.resetPasswordExpires = null;
  user.resetPasswordToken = null;
  user.password = pass;

    }catch(err){
      console.log(err)
    }

  }




















module.exports = { signIn,forgotPassword,restePassword };