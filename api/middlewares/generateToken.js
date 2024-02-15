const jwt = require('jsonwebtoken');

function generateToken(req, res, next) {
  const { body } = req;
  let email;
  if (body.username != undefined) {
    email = body.username;
  }else {
    email = req.user._json.mail;
  }

  const payload = {
     email,
  };

  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '8h' });

  req.token = token;

  next();
}

module.exports = generateToken;