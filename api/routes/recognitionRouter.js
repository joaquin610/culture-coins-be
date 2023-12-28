const express = require('express');
const router = express.Router();
const recognition = require('../controllers/recognitionController')

//router.get('/:id', validateJWT, carts.detail)
router.post('/', recognition.add)
router.get('/lastMinute', recognition.listLastMinute);
router.get('/:user', recognition.list);
router.get('/', recognition.list);

module.exports = router;
