const User = require ("../auth/model");
const Student= require ("../student/model")
const Entreprise = require("../entreprise/model")
// register 
const bcrypt = require('bcryptjs');
const { mail } = require("../../helpers/mailer");
const {generateOTP} =require("../../helpers/OTP");
const {sendOTPEmail}=require("../../helpers/OTP");

const jwt = require("jsonwebtoken");
const { GenerateToken } = require("../../helpers/JWT");

// sign in
const signInStudent = async (req, res, next) => {
  const { email, password } = req.body;
  const data = {};

  try {
    const user = await Student.findOne({ where: { email } });
    console.log(user);
    if (!user) {
      throw new Error("Invalid email address");
    }
    if (user.status === "pending activation") {
      return res.status(401).json({ error: "inactive" });
    }
    const matched = await bcrypt.compare(password, user.password);
    if (matched) {
      data.userId = user.id;
      data.username = user.name;
      data.email = user.email;
      data.created_at = user.created_at;

      const token = await GenerateToken({
        id: user.id,
        name: user.name,
        email: user.email,
        type: "student",
      });

      return res.status(200).json({ ...data, token });
    }
    return res.status(401).json({ error: "Incorrect password" });
  } catch (err) {
    console.error(err);
    res.status(401).json({
      error: "Error logging you in, please try again later",
    });
  }
};




  


//sign in compagny 
const signInCompany = async (req, res, next) => {
   
    try {  
      const { email, password } = req.body;
  const data = {};
  const user1 = await Entreprise.findOne({
    where: { email: email },
  });

  if (!user1) {
    throw new Error("Adresse e-mail invalide");
  }

  if (user1.status === "pending activation") {
    return res.status(401).json({ error: "inactive" });
  }

      const matched = await bcrypt.compare(password, user1.password);
      if (matched) {
        data.userId = user1.id;
        data.username = user1.name;
        data.email = user1.email;
        data.created_at = user1.created_at;

        //const token = jwt.sign({ email: user1.email }, "islam");
       // if (saved) {
          const token = await GenerateToken({
            id: user1.id,
            name: user1.name,
            email: user1.email,
            type: "company"
          });

        return res.status(200).json({ ...data, token });
    }
      return res.status(401).json({ error: "wrong" });
    
}catch (error) {
  console.error(error.message);
return res.status(401).send(error.message);
}
}

//ForgetPassword
const forgotPasswordStudent = async (req, res, next) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await Student.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    const otp = await generateOTP(); // Generate OTP
    await mail(user.email, "OTP Verification", `Your OTP is ${otp}`);

    user.resetPasswordToken = otp;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    return res
      .status(200)
      .json({ ok: true, message: "OTP sent to your email" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Error sending OTP, please try again later" });
  }
};
//verifyOtp
const verifyOTPStudent = async (req, res, next) => {
  const { email, OTP } = req.body;

  const student = await Student.findOne({ where: { email: email } });
  if (!student) {
    return res.status(404).json({ status: false, message: 'Student not found' });
  }
  
  if (student.status === 'active') {
    return res.status(400).json({ status: false, message: 'Student already verified' });
  }

  try {
    if (student.OTP === +OTP) {
      student.status = 'active';
      student.OTP = null;
      await student.save();
      return res.status(200).json({
        status: true,
        message: "OTP verified",
      });
    } else {
      return res.status(400).json({ status: false, message: 'OTP not verified' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Error verifying OTP' });
  }
}
// resendOtpStudent 

async function resendOtp(req, res) {
  const { email } = req.body;

  const user = await Student.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ status: false, message: 'User not found' });
  }

  if (user.isVerified) {
    return res.status(400).json({ status: false, message: 'User already verified' });
  }

  try {
    const otp = await generateOTP(); // Generate OTP
    user.otp = otp;
    await user.save();
    await mail(user.email, "OTP Verification", `Your OTP is ${otp}`);
    return res.status(200).json({
      status: true,
      message: 'New OTP sent to your email',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Error resending OTP' });
  }
}

// resetPasswordStudent
  const resetPasswordStudent = async (req, res, next) => {
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
const forgotPasswordCompany = async (req, res, next) => {
  const { email } = req.body;

  try {
    // Find the entreprise by email
    const entreprise = await Entreprise.findOne({
      where: { email: email },
    });

    if (!entreprise) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    const otp = await generateOTP(); // Generate OTP
    await mail(entreprise.email, "OTP Verification", `Your OTP is ${otp}`);

    entreprise.resetPasswordToken = otp;
    entreprise.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await entreprise.save();

    return res
      .status(200)
      .json({ ok: true, message: "OTP sent to your email" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Error sending OTP, please try again later" });
  }
};
//verifyOTPEntreprise 
const verifyOTPCompany = async (req, res, next) => {
  const { email, OTP } = req.body;
  try {
    const entreprise = await Entreprise.findOne({ where: { email } });
    if (!entreprise) {
      throw new Error("Invalid email address");
    }
    if (entreprise.OTP !== OTP) {
      throw new Error("Invalid OTP");
    }
    const timeDiff = entreprise.otpExpires - Date.now();
    if (timeDiff < 0) {
      throw new Error("OTP expired");
    }
    entreprise.otp = null;
    entreprise.otpExpires = null;
    entreprise.status = 'active';
    await entreprise.save();
    res.status(200).json({ ok: true, message: "OTP verified successfully" });
  } catch (err) {
    return next(err.message);
  }
};

//resendOTP
async function resendOtpC(req, res) {
  const { email } = req.body;

  const entreprise = await Entreprise.findOne({ where: { email: email } });
  if (!entreprise) {
    return res.status(404).json({ status: false, message: 'Company not found' });
  }

  if (entreprise.status === 'active') {
    return res.status(400).json({ status: false, message: 'Company already verified' });
  }

  try {
    const otp = await generateOTP(); // Generate OTP
    entreprise.OTP = otp;
    await entreprise.save();
    await mail(entreprise.email, "OTP Verification", `Your OTP is ${otp}`);
    return res.status(200).json({
      status: true,
      message: 'New OTP sent to your email',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Error resending OTP' });
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












module.exports = { signInStudent,
  forgotPasswordStudent,
  verifyOTPStudent,
  resetPasswordStudent,
  signInCompany,
  resetPasswordCompany,
  resendOtp,
  forgotPasswordCompany,
  verifyOTPCompany,
  resendOtpC,
resetPasswordCompany


};