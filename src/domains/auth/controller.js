const User = require("../auth/model");
const Student = require("../student/model")
const Entreprise = require("../entreprise/model")
const Admin = require("../admin/model")
const bcrypt = require('bcryptjs');
const { mail } = require("../../helpers/mailer");
const { generateOTP } = require("../../helpers/OTP");
const { sendOTPEmail } = require("../../helpers/OTP");

const jwt = require("jsonwebtoken");
const { GenerateToken } = require("../../helpers/JWT");

//sign in for admin 

const signInAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  const data = {};
  try {
    

    const admin = await Admin.findOne({ where: { email } });
    // console.log(user);
    if (!admin) {
      throw new Error("Invalid email address");
    }
 
    if (password != admin.password){
      throw new Error("Incorrect password");
    }

    data.userId = admin.id;
    data.email = admin.email;
    data.role = admin.role;
    data.created_at = admin.created_at;

    const token = await GenerateToken(data);

    res.status(200).json({ data, token });
  } catch (err) {
    next(err);
  }
};

















// // sign in
const signInStudent = async (req, res, next) => {
  const { email, password } = req.body;
  const data = {};
  try {
    const user2 = await Student.findOne({ where: { email } });
    // console.log(user);
    if (!user2) {
      throw new Error("Invalid email address");
    }
    if (user2.status === "pending activation") {
      throw new res.status(401).json({ error: "Account is inactive" });
    }
    const matched = await bcrypt.compare(password, user2.password);
    if (!matched) {
      throw new Error("Incorrect password");

    }
    data.userId = user2.id;
    data.username = user2.name;
    data.email = user2.email;
    data.created_at = user2.created_at;

    const token = await GenerateToken({
      id: user2.id,
      name: user2.name,
      email: user2.email,
      type: "student",
    });

    res.status(200).json({ data, token });
  } catch (err) {
    next(err);
  }
};

// where get profile/??




//sign in compagny 
const signInCompany = async (req, res, next) => {
  const { email, password } = req.body;
  const data = {};
  try {


    // Email format validation
    //const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //if (!emailRegex.test(email)) {
    //throw new Error (  "Invalid email address" );
    //}

    const user1 = await Entreprise.findOne({
      where: { email: email },
    });

    if (!user1) {
      throw new Error("Invalid email address");
    }

    if (user1.status === "pending activation") {
      throw new Error( "inactive");
    }

    const matched = await bcrypt.compare(password, user1.password);
    if (!matched) {
      throw new Error('Incorrect password');

    }
    data.userId = user1.id;
    data.username = user1.name;
    data.email = user1.email;
    data.created_at = user1.created_at;

    const token = await GenerateToken({
      id: user1.id,
      name: user1.name,
      email: user1.email,
      type: "company"
    });

    res.status(200).json({ data, token });

  } catch (error) {
    console.error(error.message);
    next(error);

  }
}



//ForgetPassword
const forgotPasswordStudent = async (req, res, next) => {
  try {
    const { email } = req.body;


    const student = await Student.findOne({ where: { email: email } });
    if (!student) {
      throw new Error("Invalid email address");
    }
    const otp = await generateOTP();
    await mail(student.email, "OTP Verification", `Your OTP is ${otp}`);
    student.OTP = otp;
    await student.save();
    return res.status(200).json({ ok: true, message: "OTP sent to your email" });
  } catch (err) {
    console.error(err);
    next(err);
    throw new Error("Error sending OTP, please try again later");


  }
};

//verifyOtp
const verifyOTPStudent = async (req, res, next) => {
  const { email, OTP } = req.body;
  console.log(email);
  try {


    const student = await Student.findOne({ where: { email: email } });
    if (!student) {
      throw new Error('Student not found');
    }
    // console.log(student)
    // console.log("-".repeat(10))
    // console.log(otp)
    // console.log("-".repeat(10))
    // console.log("-".repeat(10))
    // console.log(student.OTP)
    // console.log("-".repeat(10))

    if (student.OTP != +OTP) {
      throw new Error('Invalid OTP');
    }

    const resetPasswordToken = await GenerateToken({
      id: student.id,
      name: student.name,
      email: student.email,
      type: "student"
    });

    student.resetPasswordToken = resetPasswordToken;
    student.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await student.save();

    return res.json({ message: "OTP Verif!!", resetPasswordToken });
  } catch (error) {
    next(error);


  }
}

// resendOtpStudent 

async function resendOtp(req, res) {
  const { email } = req.body;
  const student = await Student.findOne({ where: { email } });
  if (!student) {
    return res.status(404).json({ status: false, message: 'student not found' });
  }
  if (student.isVerified) {
    return res.status(200).json({ status: false, message: 'student already verified' });

  }

  try {





    const otp = await generateOTP(); // Generate OTP
    student.OTP = otp;
    await student.save();
    await mail(student.email, "OTP Verification", `Your OTP is ${otp}`);
    return res.status(200).json({
      status: true,
      message: 'New OTP sent to your email',
    });
  } catch (error) {
    console.error(error);
    next(error);

  }
}


// resetPasswordStudent
const resetPasswordStudent = async (req, res, next) => {
  const { password, confirmpassword, resetPasswordToken } = req.body;
  try {


    // Find the user by email
    const user = await Student.findOne({
      where: { resetPasswordToken: resetPasswordToken }
    })
    if (!user) {
      return res.status(404).json({ status: false, message: 'Invalid password reset token' });
    }
    if (Date.now() > this.resetPasswordExpires) {
      return res.status(400).json({ status: false, message: 'Password reset token has expired' });
    }
    if (password !== confirmpassword) {
      throw new Error('Les mots de passe ne correspondent pas');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmPasswordHash = await bcrypt.hash(confirmpassword, 10);
    user.resetPasswordExpires = null;
    user.resetPasswordToken = null;
    user.password = hashedPassword;
    user.confirmpassword = confirmPasswordHash;
    await user.save()

    res.status(200).json({ status: true, message: 'Password has been changed successfully' });

  } catch (err) {
    console.log(err);
    next(err);

    console.log(err)

  }
}

//verifyOtpFORSIGNUP




//forgetPasswordCompany//////////
//ForgetPassword
const forgotPasswordCompany = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(email);

    // Find the entreprise by email
    const entreprise = await Entreprise.findOne({
      where: { email: email },
    });

    if (!entreprise) {
      throw new Error("Invalid email address");
    }

    const otp = await generateOTP(); // Generate OTP
    await mail(entreprise.email, "OTP Verification", `Your OTP is ${otp}`);

    entreprise.OTP = otp;
    //entreprise.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await entreprise.save();
    console.log(entreprise.OTP);

    return res
      .status(200)
      .json({ ok: true, message: "OTP sent to your email" });
  } catch (err) {
    console.error(err);
    next(err);

    throw new Error("Error sending OTP, please try again later");
  }
};

//verifyOTPEntreprise 
const verifyOTPCompany = async (req, res, next) => {
  const { email, OTP } = req.body;
  console.log(email)
  try {

    const entreprise = await Entreprise.findOne({ where: { email: email } });
    if (!entreprise) {
      throw new Error('compagny not found');
    }
    console.log(entreprise.OTP)
    if (entreprise.OTP != +OTP) {
      throw new Error('Invalid OTP');
    }
    const resetPasswordToken = await GenerateToken({
      id: entreprise.id,
      name: entreprise.name,
      email: entreprise.email,
      type: "company"
    });
    entreprise.resetPasswordToken = resetPasswordToken;
    entreprise.resetPasswordExpires = Date.now() + 3600000;
    await entreprise.save();
    return res.json({ message: "OTP Verif!!", resetPasswordToken });
  } catch (error) {
    next(error);
  }
}




//resendOTP
async function resendOtpC(req, res) {
  const { email } = req.body;

  const entreprise = await Entreprise.findOne({ where: { email: email } });
  if (!entreprise) {
    return res.status(404).json({ status: false, message: 'Company not found' });
  }

  if (entreprise.isVerified) {
    return res.status(200).json({ status: false, message: 'Company already verified' });
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
    next(error);

    throw new Error('Error resending OTP'); // Throw an error with the message 'Error resending OTP'
  }
}

// resetPasswordCompany
const resetPasswordCompany = async (req, res, next) => {

  try {
    const { password, confirmpassword, resetPasswordToken } = req.body;
    // Find the user by email
    const user1 = await Entreprise.findOne({
      where: { resetPasswordToken: resetPasswordToken }
    })
    if (!user1) {
      return res.status(404).json({ status: false, message: 'Invalid password reset token' });
    }
    if (Date.now() > this.resetPasswordExpires) {
      return res.status(400).json({ status: false, message: 'Password reset token has expired' });

    }
    if (password !== confirmpassword) {
      throw new Error('Les mots de passe ne correspondent pas');
    }
    console.log(user1.password);

    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmPasswordHash = await bcrypt.hash(confirmpassword, 10);
    user1.password = hashedPassword;
    user1.confirmpassword = confirmPasswordHash;
    await user1.save()
    res.status(200).json({ message: 'Password has been changed successfully' });

  } catch (err) {
    next(err);

    console.log(err)
  }

}














module.exports = {
  signInStudent,
  forgotPasswordStudent,
  verifyOTPStudent,
  resetPasswordStudent,
  signInCompany,
  resetPasswordCompany,
  resendOtp,
  forgotPasswordCompany,
  verifyOTPCompany,
  resendOtpC,
  resetPasswordCompany,
  signInAdmin


};