const passport = require("passport");
const MicrosoftStrategy = require("passport-microsoft").Strategy;

passport.use(new MicrosoftStrategy({
    clientID: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/microsoft/callback",
    scope: ['User.Read', 'mail.read'] // Aquí es donde defines el 'scope'
  },
  function(accessToken, refreshToken, profile, done) {
    // Aquí es donde buscarías al usuario en tu base de datos y lo crearías si no existe.
    // Por ahora, simplemente devolvemos el perfil del usuario.
    return done(null, profile);
  }
));
