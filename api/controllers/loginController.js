const {sendResponse}  = require ("../helpers/sendResponse");
const passport = require("passport");
require("dotenv").config();


const controller = {
    login: async (req, res) => {
        passport.authenticate("microsoft", { session: false })
    },
    callback: async (req, res) => {

    res.redirect("/"+res.req.user._json.mail);
       
    },

  
  };

module.exports = controller;