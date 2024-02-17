const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.PASS_MAIL,
  },
});

const sendEmail = async (to, subject, text) => {
  let toList = to;

  if (!Array.isArray(to)) {
    toList = [to];
  }

  const mailOptions = {
    from: process.env.USER_MAIL,
    to: toList.join(', '), 
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending the email: " + error);
  }
};

module.exports = { sendEmail };