const express = require('express');
const router = express.Router();
const recognition = require('../controllers/recognitionController')

//router.get('/:id', validateJWT, carts.detail)
router.post('/', recognition.add)
router.get('/:user', recognition.listByUser);
module.exports = router;
