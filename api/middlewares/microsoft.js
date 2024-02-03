const passport = require("passport");
const MicrosoftStrategy = require("passport-microsoft").Strategy;
const userRouter = require('../controllers/userController')


passport.use(new MicrosoftStrategy({
    clientID: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/microsoft/callback",
    scope: ['User.Read', 'mail.read']
  },
  function(accessToken, refreshToken, profile, done) {
    userRouter.addLogin(profile)

    return done(null, profile);
  },
));
