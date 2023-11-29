const ValuesBehaviors = require("../../database/schemas/ValuesBehaviors");
const {sendResponse}  = require ("../helpers/sendResponse");
require("dotenv").config();

const controller = {
  add: async (req, res) => {
    try {
      const { body } = req;
      const newValuesBehaviors = new ValuesBehaviors({
        title: body.title,
        text: body.text,
      });

      newValuesBehaviors.save()
      sendResponse(res, 200, true ,newValuesBehaviors);
    } catch (error) {
      console.log(error);
      sendResponse(res, 500, false ,null, "Internal Error");
    }
  },
  getList: async (req, res) => {
    try {
      const list = await ValuesBehaviors.find({ });
    
      if (list.length === 0) {
        sendResponse(res, 404, false ,null, "List by user does not exist");
      } else {
        sendResponse(res, 200, true ,list);
      }
    } catch (error) {
      console.log(error);
      sendResponse(res, 500, false ,null, "Internal Error");
    }
  },
};

module.exports = controller;