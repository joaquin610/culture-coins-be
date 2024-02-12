const express = require('express');
const router = express.Router();
const recognition = require('../controllers/recognitionController')
const validateToken = require('../middlewares/validateToken');

//router.get('/:id', validateJWT, carts.detail)
router.post('/',validateToken, recognition.add)
router.get('/lastMinute',validateToken, recognition.listLastMinute);
router.get('/topValues',validateToken, recognition.topValues);
router.get('/:user',validateToken, recognition.list);
router.get('/',validateToken, recognition.list);

module.exports = router;
