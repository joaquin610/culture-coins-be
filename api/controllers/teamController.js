const Team = require("../../database/schemas/Team");
const {sendResponse}  = require ("../helpers/sendResponse");
require("dotenv").config();


const controller = {
    add: async (req, res) => {
      try {
        const { body } = req;
        const newTeam = new Team({name: body.name});
  
        newTeam.save()

        sendResponse(res, 200, true, newTeam);
      } catch (error) {
        console.log(error);
        sendResponse(res, 500, false, null, 'Internal server error');
      }
    },
    list: async (req, res) => {
        try {
          const list = await Team.find();
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
          const deletedTeam = await Team.findByIdAndDelete(id);
    
          if (!deletedTeam) {
            sendResponse(res, 404, false, null, 'Team not found');
            return;
          }
    
          sendResponse(res, 200, true, deletedTeam);
        } catch (error) {
          console.log(error);
          sendResponse(res, 500, false, null, 'Internal Error');
        }
      },
  
  };

module.exports = controller;