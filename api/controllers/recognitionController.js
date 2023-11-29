const Recognition = require("../../database/schemas/Recognition");
const {sendEmail} = require ("../helpers/sentEmail")
const {sendResponse}  = require ("../helpers/sendResponse");
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
      sendResponse(res, 200, true ,newRecognition);
    } catch (error) {
      console.log(error);
      sendResponse(res, 500, false ,null, "Internal Error");
    }
  },
  listByUser: async (req, res) => {
    try {
      const listByUser = await Recognition.find({ userTo: req.params.user});
    
      if (listByUser.length === 0) {
        sendResponse(res, 404, false ,null, "List by user does not exist");
      } else {
        sendResponse(res, 200, true ,listByUser);
      }
    } catch (error) {
      console.log(error);
      sendResponse(res, 500, false ,null, "Internal Error");
    }
  },
};

module.exports = controller;
