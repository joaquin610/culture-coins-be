const express = require('express');
const router = express.Router();
const recognition = require('../controllers/recognitionRouter')

//router.get('/:id', validateJWT, carts.detail)
router.post('/', recognition.add)

module.exports = router;
