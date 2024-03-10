const passport = require("passport");
const MicrosoftStrategy = require("passport-microsoft").Strategy;
const userRouter = require('../controllers/userController')


passport.use(new MicrosoftStrategy({
    clientID: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    callbackURL: process.env.BASE_URL_BE + "auth/microsoft/callback",
    scope: ['User.Read', 'mail.read']
  },
  function(accessToken, refreshToken, profile, done) {
    const email = profile._json.mail;

    // Verifica si el correo electrónico termina en '@igglobal.com'
    if (email.endsWith('@igglobal.com') || email.endsWith('@infogain')) {
      return done('Invalid email');
    }
    userRouter.addLogin(profile)

    return done(null, profile);
  },
));
