const User = require ("../auth/model");
const Student= require ("../student/model")
const Entreprise = require("../entreprise/model")
// register 
const bcrypt = require('bcryptjs');
const { mail } = require("../../helpers/mailer");
const {generateOTP} =require("../../helpers/OTP");
const {sendOTPEmail}=require("../../helpers/OTP");

const jwt = require("jsonwebtoken");

// sign in
const signInStudent = async (req, res, next) => {
    const { email, password } = req.body;
    const data = {};

    try {
      const user = await Student.findOne( {
        where:{email:email}
      });
      if (!user) {
        throw new Error('Adresse e-mail invalide');
      }
      if (user.status === "pending activation") {
        return res.status(401).json({ error: "inactive" });
      }
      bcrypt.compare(password, user.password, (err, matched) => {
        if (matched) {
          data.userId = user.id;
          data.username = user.name;
          data.email = user.email;
         // data.picture = user.picture;
          data.created_at = user.created_at;

          const token = jwt.sign({ email: user.email }, 'islam');
       /*   const expirationTime = new Date(
              Date.now() + parseInt(process.env.JWT_EXPIRATION)
          );*/

          // res.setHeader("set-cookie", [
          //  // `token=${token}; httpOnly=true; expires: ${expirationTime}; SameSite=None; Secure`,
          // //  `email=${data.email}; httpOnly=true; expires: ${expirationTime}; SameSite=None; Secure`,
          //  // `userId=${data.userId}; httpOnly=true; expires: ${expirationTime}; SameSite=None; Secure`,
          // ]);
          return res.status(200).json({ ...data, token });
        }
        return res.status(401).json({ error: "wrong" });
      });

    } catch (err) {

      res.status(401).json({
        error: "Error logging you in, please try again later",
      });
    }
  };


//sign in compagny 
const signInCompany = async (req, res, next) => {
  const { email, password } = req.body;
  const data = {};

  try {
    const user1 = await Entreprise.findOne({
      where: { email: email },
    });
    if (!user1) {
      throw new Error("Adresse e-mail invalide");
    }
    if (user1.status === "pending activation") {
      return res.status(401).json({ error: "inactive" });
    }

    try {
      const matched = await bcrypt.compare(password, user1.password);
      if (matched) {
        data.userId = user1.id;
        data.username = user1.name;
        data.email = user1.email;
        // data.picture = user.picture;
        data.created_at = user1.created_at;

        const token = jwt.sign({ email: user1.email }, "islam");

        return res.status(200).json({ ...data, token });
      }
      return res.status(401).json({ error: "wrong" });
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: "Error logging you in, please try again later" });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Error logging you in, please try again later" });
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
// resetPasswordStudent
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




//forgetPasswordCompany//////////
//ForgetPassword
const forgotPasswordCompny = async (req, res, next) => {

  const { email } = req.body;
  console.log(email)

  try {
    // Find the user by email
    const user1 = await Entreprise.findOne({
      where:{email:email}
    })
    console.log(user1)
    if (!user1) {
      throw new Error('Adresse e-mail invalide');
    }
    const token = Math.random().toString(36).substring(7);
    console.log(token)
    user1.resetPasswordToken = token;
    user1.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user1.save()
    const resetLink = `<p>Please click <a href="">here</a> to reset your password.</p>`

    await mail(user1.email, 'Password Reset ',resetLink)
    
    res.status(200).json({ok: true, message: 'Password reset link sent' });

  } catch (err) {
    return next(err.message);
  }
}


// resetPasswordCompany
const resetPasswordCompany = async (req, res, next) => {
  const { password } = req.body;
  const { token } = req.params;
  try{
  // Find the user by email
  const user1 = await Entreprise.findOne({
    where:{resetPasswordToken:token}
  })
  if (!user1) {
    return res.status(404).json({ error: 'Invalid password reset token' });
}
if ( Date.now() > this.resetPasswordExpires){
    return res.status(400).json({ error: 'Password reset token has expired' });

}
const pass=  await bcrypt.hash(password, 10);
user1.resetPasswordExpires = null;
user1.resetPasswordToken = null;
user1.password = pass;

  }catch(err){
    console.log(err)
  }

}












module.exports = { signInStudent,forgotPassword,restePassword,signInCompany,resetPasswordCompany,forgotPasswordCompny};