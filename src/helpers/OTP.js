const crypto = require('crypto');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');
const mysql = require('mysql2');


 // Définir une fonction pour générer un OTP aléatoire à 6 chiffres
 async function generateOTP() {
   const secret = speakeasy.generateSecret({ length: 20 });
   const token = speakeasy.totp({
     secret: secret.base32,
     encoding: 'base32',
     digits: 4,
     step: 30
   });
   return token;
 }
 
 // Définir une fonction pour envoyer un e-mail avec l'OTP
 async function sendOTPEmail(email, OTP) {
   // Créer un objet de transport en utilisant SMTP
   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: 'islam.ahmed1610@gmail.com',
       pass: 'xwhnpgybjsvyybfq'
     }
   });}
  


   
exports.generateOTP=generateOTP
exports.sendOTPEmail= sendOTPEmail
