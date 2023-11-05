const express = require('express');
const router = express.Router();
const acknowledgment = require('../controllers/acknowledgmentRouter')

//router.get('/:id', validateJWT, carts.detail)
router.post('/', acknowledgment.add)

module.exports = router;
