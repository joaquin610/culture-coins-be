const Community = require("../../database/schemas/Community");
const {sendResponse}  = require ("../helpers/sendResponse");
require("dotenv").config();


const controller = {
    add: async (req, res) => {
      try {
        const { body } = req;
        const newCommunity = new Community({name: body.name});
  
        newCommunity.save()

        sendResponse(res, 200, true, newCommunity);
      } catch (error) {
        console.log(error);
        sendResponse(res, 500, false, null, 'Internal server error');
      }
    },
    list: async (req, res) => {
        try {
          const list = await Community.find();
          const listOrder = list.sort((a, b) => a.name.localeCompare(b.name));
          sendResponse(res, 200, true, listOrder);
        } catch (error) {
          console.log(error);
          sendResponse(res, 500, false, null, "Internal Error");
        }
    },
    delete: async (req, res) => {
        try {
          const { id } = req.params;
          const deletedCommunity = await Community.findByIdAndDelete(id);
    
          if (!deletedCommunity) {
            sendResponse(res, 404, false, null, 'Community not found');
            return;
          }
    
          sendResponse(res, 200, true, deletedCommunity);
        } catch (error) {
          console.log(error);
          sendResponse(res, 500, false, null, 'Internal Error');
        }
      },
  
  };

module.exports = controller;