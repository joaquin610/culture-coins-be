const Recognition = require("../../database/schemas/Recognition");
const nodemailer = require("nodemailer");
const {sendEmail} = require ("../helpers/sentEmail")
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
      const newRecognition = new Recognition({
        userTo: body.userTo,
        userFrom: body.userFrom,
        message: body.message,
        category: body.category,
        subCategory: body.subCategory
      });

      newRecognition
        .save()
        .then(async (doc) => {
          console.log(doc);
          await sendEmail(body.userTo, "New Recognition", `User ${body.userFrom} has recognized you`);
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
