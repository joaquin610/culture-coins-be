const express = require('express');
const router = express.Router();
const recognition = require('../controllers/recognitionController')
const validateToken = require('../middlewares/validateToken');


router.post('/',validateToken, recognition.add)
router.post('/feedback',validateToken, recognition.addFeedbak)
router.get('/feedback/:user',validateToken, recognition.getFeedback)
router.get('/lastMinute',validateToken, recognition.listLastMinute);
router.get('/topValues',validateToken, recognition.topValues);
router.get('/:user',validateToken, recognition.list);
router.get('/',validateToken, recognition.list);

module.exports = router;
