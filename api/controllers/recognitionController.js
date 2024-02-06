const Recognition = require("../../database/schemas/Recognition");
const User = require("../../database/schemas/User");
const {sendEmail} = require ("../helpers/sentEmail")
const {sendResponse}  = require ("../helpers/sendResponse");
const {orderByDate}  = require ("../helpers/orderByDate");
require("dotenv").config();

const controller = {
  add: async (req, res) => {
    try {
      const { body } = req;
      const userToEmail = body.userToEmail;
      const userFromEmail = body.userFromEmail;

      const userTo = await User.findOne({ email: userToEmail });
      const userFrom = await User.findOne({email: userFromEmail });

      const newRecognition = new Recognition({
        userToEmail: userToEmail,
        userToNickName: userTo.nickName,
        userFromNickName: userFrom.nickName,
        message: body.message,
        category: body.category,
        subCategory: body.subCategory
      });

      newRecognition
        .save()
        .then(async (doc) => {
          console.log(doc);
          await sendEmail(userToEmail, "New Recognition", `User ${userFrom.nickName} has recognized you`);
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
  list: async (req, res) => {
    try {
      let query = {};      
      if (req.params.user) {
        query.userToEmail = req.params.user;
      }
      let listByUser = await Recognition.find(query);
      listByUser = orderByDate(listByUser);      
      sendResponse(res, 200, true, listByUser);
    } catch (error) {
      console.log(error);
      sendResponse(res, 500, false, null, "Internal Error");
    }
  },
  listLastMinute: async (req, res) => {
    try {
      const currentTime = new Date();
      const lastMinuteTime = new Date(currentTime.getTime() - 60000);

      const lastMinuteRecognitions = await Recognition.find({
        createdAt: { $gte: lastMinuteTime, $lte: currentTime },
      });

      sendResponse(res, 200, true, lastMinuteRecognitions);
    } catch (error) {
      console.log(error);
      sendResponse(res, 500, false, null, "Internal Error");
    }
  },
};

module.exports = controller;
