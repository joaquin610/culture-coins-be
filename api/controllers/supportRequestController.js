const SupportRequest = require("../../database/schemas/SupportRequest");
const { sendEmail } = require("../helpers/sentEmail");
const {sendResponse}  = require ("../helpers/sendResponse");
const {orderByDate}  = require ("../helpers/orderByDate");
const {updatePoints} = require ("../helpers/assignPoints")
const User = require("../../database/schemas/User");
require("dotenv").config();

function sanitizeHTMLTags(input) {
  return input.replace(/<[^>]*>/g, '');
}

const controller = {
  add: async (req, res) => {
    try {
      const {title, message, priority, userFrom, community} = req.body;
      const mensajeSanitizado = `${title}\n\n${sanitizeHTMLTags(message)}`;
      const newSupportRequest = new SupportRequest({
        title : title,
        message: message,
        priority: priority,
        userFrom: userFrom,
        community: community,
      });

      newSupportRequest
        .save()
        .then(async (doc) => {
          const supports = await User.find({ receiveSupportRequest: true });
          const supportEmails = supports.map((user) => user.email);

          await sendEmail(
            supportEmails,
            "Culture coins - someone needs your help",
            mensajeSanitizado
          );
          const user = await User.findOne({ email: userFrom });
          const points = priority === "urgent" ?  2 : priority === "next-day" ?  1 :  0;
          
          updatePoints(user, points, false);
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
  list: async (req, res) => {
    try {
      let list = await SupportRequest.find({
        isDeleted: false,
        status: { $ne: 'Done' } 
    });
    
        list = orderByDate(list);
        sendResponse(res, 200, true ,list);

    } catch (error) {
      console.log(error);
      sendResponse(res, 500, false ,null, "Internal Error");
    }
  },
  listByUser: async (req, res) => {
    try {
      let listByUser = await SupportRequest.find({
        userFrom: req.params.user,
        isDeleted: false,
        status: { $ne: 'Done' } 
    });
    
        listByUser = orderByDate(listByUser);
        sendResponse(res, 200, true ,listByUser);

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
