const Recognition = require("../../database/schemas/Recognition");
const Feedback = require("../../database/schemas/Feedback");
const User = require("../../database/schemas/User");
const { sendEmail } = require("../helpers/sentEmail");
const { sendResponse } = require("../helpers/sendResponse");
const { orderByDate } = require("../helpers/orderByDate");
const { updatePoints } = require("../helpers/assignPoints");
require("dotenv").config();

const controller = {
  add: async (req, res) => {
    try {
      const { body } = req;
      const userToEmail = body.userToEmail;
      const userFromEmail = body.userFromEmail;

      const userTo = await User.findOne({ email: userToEmail });
      const userFrom = await User.findOne({ email: userFromEmail });

      const newRecognition = new Recognition({
        userToEmail: userToEmail,
        userToNickName: userTo.nickName,
        userFromNickName: userFrom.nickName,
        message: body.message,
        category: body.category,
        subCategory: body.subCategory,
      });

      newRecognition
        .save()
        .then(async (doc) => {
          updatePoints(userTo, 10, true);
          updatePoints(userFrom, 1, true);
          await sendEmail(
            userToEmail,
            "New Recognition",
            `User ${userFrom.nickName} has recognized you`
          );
        })
        .catch((err) => {
          console.error(err);
        });
      sendResponse(res, 200, true, newRecognition);
    } catch (error) {
      console.log(error);
      sendResponse(res, 500, false, null, "Internal Error");
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
  topValues: async (req, res) => {
    try {
      const topSubCategories = await Recognition.aggregate([
        { $unwind: "$subCategory" },
        { $sort: { createdAt: -1 } },
        {
          $group: {
            _id: "$subCategory",
            count: { $sum: 1 },
            lastRecognition: { $first: "$$ROOT" },
          },
        },
        {
          $project: {
            count: 1,
            userToNickName: "$lastRecognition.userToNickName",
            userFromNickName: "$lastRecognition.userFromNickName",
            createdAt: "$lastRecognition.createdAt",
            message: "$lastRecognition.message",
          },
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]);

      sendResponse(res, 200, true, topSubCategories);
    } catch (error) {
      sendResponse(res, 500, false, null, "Internal Error");
    }
  },

  addFeedbak: async (req, res) => {
    try {
      const { body } = req;
      const { userToEmail, userFromEmail, message } = body;

      if (!userToEmail || !userFromEmail || !message) {
        return sendResponse(res, 400, false, null, "Missing parameters");
      }

      const userTo = await User.findOne({ email: userToEmail });
      const userFrom = await User.findOne({ email: userFromEmail });

      const newFeedBack = new Feedback({
        userToEmail: userToEmail,
        userToNickName: userTo.nickName,
        userFromNickName: userFrom.nickName,
        message: body.message,
      });

      newFeedBack.save().then(async (doc) => {
        updatePoints(userTo, 10, true);
        updatePoints(userFrom, 3, true);
        await sendEmail(
          userToEmail,
          "New Feedback",
          `User ${userFrom.nickName} has given you a feedback`
        );
      });

      sendResponse(res, 200, true, newFeedBack);
    } catch (error) {
      console.log(error);
      sendResponse(res, 500, false, null, "Internal Error");
    }
  },
  getFeedback: async (req, res) => {
    if (!req.params.user) {
      return sendResponse(res, 400, false, null, "User parameter is missing");
    }
    try {
      const query = { userToEmail: req.params.user };
      let listByUser = await Feedback.find(query);
      listByUser = orderByDate(listByUser);
      sendResponse(res, 200, true, listByUser);
    } catch (error) {
      console.error(error);
      sendResponse(res, 500, false, null, `Failed to get feedback: ${error.message}`
      );
    }
  },
};

module.exports = controller;
