const Recognition = require("../../database/schemas/Recognition");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.PASS_MAIL,
  },
});


const controller = {
  add: async (req, res) => {
    try {
      const { body } = req;
      let newRecognition = new Recognition({
        userTo: body.userTo,
        userFrom: body.userFrom,
        message: body.message,
      });

      newRecognition
        .save()
        .then(async (doc) => {
          console.log(doc);

          const mailOptions = {
            from: process.env.USER_MAIL,
            to: body.userTo,
            subject: "New Recognition",
            text: `User ${body.userFrom} has recognized you`,
          };

          await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending the e-mail: " + error);
            } else {
              console.log("Sent");
            }
          });
        })
        .catch((err) => {
          console.error(err);
        });

      res.status(200).json({
        status: "test",
        ok: true,
        data: {},
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        ok: false,
      });
    }
  },
};

module.exports = controller;
