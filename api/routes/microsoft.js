const express = require("express");
const passport = require("passport");
const generateToken = require('../middlewares/generateToken');

const router = express.Router();

router.get("/microsoft",
  passport.authenticate("microsoft", { session: false }));

router.get("/microsoft/callback", 
  passport.authenticate("microsoft", { failureRedirect: "/login", session: false }),generateToken,
  function(req, res) {
    
    console.log("mail: ",res.req.user._json.mail);
    const redirectUrl = `http://localhost:8080/#/dashboard?token=${req.token}`;
    res.redirect(redirectUrl);
  });

module.exports = router;

