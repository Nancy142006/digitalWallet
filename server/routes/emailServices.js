const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// Function to send a welcome email
const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    await transporter.sendMail({
      from: `"Your Digital Wallet" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "Welcome to Digital Wallet",
      html: `<h2>Welcome, ${userName}!</h2>
             <p>Thank you for registering. We are excited to have you on board.</p>
             <p>Start exploring your digital wallet today!</p>
             <p>Best Regards, <br/> Digital Wallet Team</p>`,
    });
    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Function to send OTP Email
const sendOTPEmail = async(userEmail,otp)=>{
   try {
     await transporter.sendMail({
       from: process.env.EMAIL_USER,
       to: userEmail,
       subject: "Your OTP Code for Transaction",
       html: `<h2>Your OTP Code: ${otp}</h2>
                   <p>Please use this code to complete your transaction. This OTP is valid for 5 minutes.</p>
                   <p>If you didn’t request this, please ignore this email.</p>
                   <p>Best Regards,<br/>Digital Wallet Team</p>`,
     });
     console.log("✅ OTP email sent!");
   } catch (error) {
     console.error("❌ Error sending OTP email:", error);
   }
};

module.exports = {sendWelcomeEmail, sendOTPEmail};
