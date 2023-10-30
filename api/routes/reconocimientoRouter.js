const express = require('express');
const router = express.Router();
const reconocimiento = require('../controllers/reconocimientoRouter')

//router.get('/:id', validateJWT, carts.detail)
router.get('/', reconocimiento.test)


module.exports = router;
