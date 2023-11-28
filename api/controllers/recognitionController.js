const Recognition = require("../../database/schemas/Recognition");
const {sendEmail} = require ("../helpers/sentEmail")
require("dotenv").config();

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
  listByUser: async (req, res) => {
    try {
      const listByUser = await Recognition.find({ userTo: req.params.user});
    
      if (listByUser === null) {
        res.status(404).json({
          status: "List by user does not exist",
          data: [],
        });
      } else {
        res.status(200).json({
          ok:true,
          data: listByUser,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "Internal Error",
        data: [],
      });
    }
  },
};

module.exports = controller;
