const nodemailer = require("nodemailer");
require("dotenv").config();

const transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const mailOptions = {
      from: '"Your Digital Wallet" <process.env.EMAIL_USER',
      to: userEmail,
      subject: "Welcome to Digital Wallet",
      html: `<h2>Welcome, ${userName}!</h2>
            <p>Thank you for registering. We are excited to have you on board.</p>
             <p>Start exploring your digital wallet today!</p>
             <p>Best Regards, <br/> Digital Wallet Team</p>`,
    };

    await transpoter.sendMail(mailOptions);
    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendWelcomeEmail;
