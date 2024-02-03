const express = require('express');
const router = express.Router();
const valuesBehaviors = require('../controllers/valuesBehaviorsController');
const validateToken = require('../middlewares/validateToken');
router.get('/',validateToken, valuesBehaviors.getList);
router.post('/',validateToken, valuesBehaviors.add);


module.exports = router;