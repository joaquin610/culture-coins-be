const SupportRequest = require("../../database/schemas/SupportRequest");
const { sendEmail } = require("../helpers/sentEmail");
const User = require("../../database/schemas/User");
require("dotenv").config();

function sanitizeHTMLTags(input) {
  return input.replace(/<[^>]*>/g, '');
}

const controller = {
  add: async (req, res) => {
    try {
      const { body } = req;
      //const mensajeSanitizado = sanitizeHTMLTags(body.message);
      const mensajeSanitizado = `${body.title}\n\n${sanitizeHTMLTags(body.message)}`;

      const newSupportRequest = new SupportRequest({
        title : body.title,
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
            mensajeSanitizado
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
      const listByUser = await SupportRequest.find({ userFrom: req.params.user });
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
