const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/microsoft",
  passport.authenticate("microsoft", { session: false }));

router.get("/microsoft/callback", 
  passport.authenticate("microsoft", { failureRedirect: "/login", session: false }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(res);
    res.redirect("/");
  });

module.exports = router;