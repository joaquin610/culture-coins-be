const SupportRequest = require("../../database/schemas/SupportRequest");
const { sendEmail } = require("../helpers/sentEmail");
const {sendResponse}  = require ("../helpers/sendResponse");
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
      sendResponse(res, 200, true ,newSupportRequest);
    } catch (error) {
      console.error(error);
      sendResponse(res, 500, false ,null, "Internal server error");
    }
  },
  listByUser: async (req, res) => {
    try {
      const listByUser = await SupportRequest.find({
        userFrom: req.params.user,
        isDeleted: false,
        status: { $ne: 'Done' } 
    });
    
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
  edit: async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const existingSupportRequest = await SupportRequest.findById(id);

      if (existingSupportRequest.length === 0) {
        return sendResponse(res, 404, false ,null, "Support request not found");
      }

      existingSupportRequest.message = body.message;
      existingSupportRequest.updatedAt = new Date();

      await existingSupportRequest.save();

      sendResponse(res, 200, true , existingSupportRequest);
    } catch (error) {
      console.error(error);
      return sendResponse(res, 500, false ,null, 'Internal server error');
    }
  },
  getRequestById: async (req, res) => {
    try {
      const { id } = req.params;

      const supportRequest = await SupportRequest.findById(id);

      if (supportRequest.length === 0) {
        return sendResponse(res, 404, false ,null, 'Support request not found');
      }
      sendResponse(res, 200, true ,supportRequest);

    } catch (error) {
      console.error(error);
      sendResponse(res, 500, false ,null, 'Internal server error');
    }
  },
  deleteById: async (req, res) => {
    try {
      const { id } = req.params;

      const supportRequest = await SupportRequest.findById(id);
      
      if (supportRequest.length === 0) {
        return sendResponse(res, 404, false ,null, 'Support request not found');
      }
      supportRequest.isDeleted = true;
      supportRequest.updatedAt = new Date();

      await supportRequest.save();

      sendResponse(res, 200, true ,supportRequest);
    } catch (error) {
      console.error(error);
      sendResponse(res, 500, false ,null, 'Internal server error');
    }
  },
  changeStatus: async (req, res) => {
    try {
      const { id } = req.params;

      const existingSupportRequest = await SupportRequest.findById(id);

      if (existingSupportRequest.length === 0) {
        return sendResponse(res, 404, false ,null, "Support request not found");
      }
      if(existingSupportRequest.status === "Pending"){
        existingSupportRequest.status = "In progress";
      }else{
        existingSupportRequest.status = "Done";
      }
      
      existingSupportRequest.updatedAt = new Date();

      await existingSupportRequest.save();

      sendResponse(res, 200, true ,existingSupportRequest);
    } catch (error) {
      console.error(error);
      return sendResponse(res, 500, false ,null, 'Internal server error');
    }
  },
  
};

module.exports = controller;
