const SupportRequest = require("../../database/schemas/SupportRequest.JS");
const { sendEmail } = require("../helpers/sentEmail");
const User = require("../../database/schemas/User");
require("dotenv").config();

const controller = {
  add: async (req, res) => {
    try {
      const { body } = req;
      const newSupportRequest = new SupportRequest({
        message: body.message,
        priority: body.priority,
        userFrom: body.userFrom,
      });

      newSupportRequest
        .save()
        .then(async (doc) => {
          console.log(doc);
          const supports = await User.find({ support: true });
          const supportEmails = supports.map((user) => user.email);

          await sendEmail(
            supportEmails,
            "Culture coins - someone needs your help",
            body.message
          );
        })
        .catch((err) => {
          console.error(err);
        });

      res.status(200).json({
        status: "Notification sent to support users",
        ok: true,
        data: {},
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: "Internal server error",
      });
    }
  },
  listByUser: async (req, res) => {
    try {
      const user = req.params.user;

      const listByUser = await SupportRequest.find({ userFrom: user });
      if (listByUser === null) {
        res.status(404).json({
          status: "List by user does not exist",
          data: [],
        });
      } else {
        res.status(200).json({
          status: "Ok",
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
