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
      const mensajeSanitizado = `${body.title}\n\n${sanitizeHTMLTags(body.message)}`;

      const newSupportRequest = new SupportRequest({
        title : body.title,
        message: body.message,
        priority: body.priority,
        userFrom: body.userFrom,
        createdAt: new Date(),
        updatedAt: null
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
      const listByUser = await SupportRequest.find({
        userFrom: req.params.user,
        isDeleted: false,
        status: { $ne: 'Done' } 
    });
    
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
  edit: async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const existingSupportRequest = await SupportRequest.findById(id);

      if (!existingSupportRequest) {
        return res.status(404).json({
          ok: false,
          error: 'Support request not found',
        });
      }

      existingSupportRequest.message = body.message;
      existingSupportRequest.updatedAt = new Date();

      await existingSupportRequest.save();

      res.status(200).json({
        ok: true,
        data: existingSupportRequest,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: 'Internal server error',
      });
    }
  },
  getRequestById: async (req, res) => {
    try {
      const { id } = req.params;

      const supportRequest = await SupportRequest.findById(id);

      if (!supportRequest) {
        return res.status(404).json({
          ok: false,
          error: 'Support request not found',
        });
      }

      res.status(200).json({
        ok: true,
        data: supportRequest,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: 'Internal server error',
      });
    }
  },
  deleteById: async (req, res) => {
    try {
      const { id } = req.params;

      const supportRequest = await SupportRequest.findById(id);
      
      if (!supportRequest) {
        return res.status(404).json({
          ok: false,
          error: 'Support request not found',
        });
      }
      supportRequest.isDeleted = true;
      supportRequest.updatedAt = new Date();

      await supportRequest.save();


      res.status(200).json({
        ok: true,
        message: 'Support request successfully deleted',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: 'Internal server error',
      });
    }
  },
};

module.exports = controller;
