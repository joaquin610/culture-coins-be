const Skill = require("../../database/schemas/Skill");
const {sendResponse}  = require ("../helpers/sendResponse");
require("dotenv").config();


const controller = {
    add: async (req, res) => {
      try {
        const { body } = req;
        const newSkill = new Skill({name: body.name});
  
        newSkill.save()

        sendResponse(res, 200, true, newSkill);
      } catch (error) {
        console.log(error);
        sendResponse(res, 500, false, null, 'Internal server error');
      }
    },
    list: async (req, res) => {
        try {
          const list = await Skill.find();
          sendResponse(res, 200, true, list);
        } catch (error) {
          console.log(error);
          sendResponse(res, 500, false, null, "Internal Error");
        }
    },
    delete: async (req, res) => {
        try {
          const { id } = req.params;
          const deletedSkill = await Skill.findByIdAndDelete(id);
    
          if (!deletedSkill) {
            sendResponse(res, 404, false, null, 'Skill not found');
            return;
          }
    
          sendResponse(res, 200, true, deletedSkill);
        } catch (error) {
          console.log(error);
          sendResponse(res, 500, false, null, 'Internal Error');
        }
      },
  
  };

module.exports = controller;