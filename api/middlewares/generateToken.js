const jwt = require('jsonwebtoken');

function generateToken(req, res, next) {
  // Asume que la información del usuario está en req.user
//   const user = req.user;

  // Define la carga útil del token
  const payload = {
    // id: user.id,
     email: req.user._json.mail,
    // Puedes añadir más información del usuario aquí si lo necesitas
  };

  // Firma el token con la clave secreta
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '8h' });

  // Guarda el token en req.token para que los siguientes middlewares puedan acceder a él
  req.token = token;

  // Pasa al siguiente middleware
  next();
}

module.exports = generateToken;