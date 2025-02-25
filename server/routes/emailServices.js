const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other services like Outlook, Yahoo, etc.
  auth: {
    user: process.env.EMAIL_USER, // Replace with your email
    pass: process.env.EMAIL_PASS, // Replace with your email password or App Password
  },
});

// Function to send a welcome email
const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const mailOptions = {
      from: '"Your Digital Wallet" process.env.EMAIL_USER',
      to: userEmail,
      subject: "Welcome to Digital Wallet",
      html: `<h2>Welcome, ${userName}!</h2>
             <p>Thank you for registering. We are excited to have you on board.</p>
             <p>Start exploring your digital wallet today!</p>
             <p>Best Regards, <br/> Digital Wallet Team</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendWelcomeEmail;
