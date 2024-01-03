const Recognition = require("../../database/schemas/Recognition");
const {sendEmail} = require ("../helpers/sentEmail")
const {sendResponse}  = require ("../helpers/sendResponse");
const {orderByDate}  = require ("../helpers/orderByDate");
require("dotenv").config();

const controller = {
  add: async (req, res) => {
    try {
      const { body } = req;
      const newRecognition = new Recognition({
        userFromNickName: body.userFromNickName,
        userToEmail: body.userToEmail,
        userToNickName: body.userToNickName,
        message: body.message,
        category: body.category,
        subCategory: body.subCategory
      });

      newRecognition
        .save()
        .then(async (doc) => {
          console.log(doc);
          await sendEmail(body.userToEmail, "New Recognition", `User ${body.userFromNickName} has recognized you`);
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
