const express = require('express');
const router = express.Router();
const valuesBehaviors = require('../controllers/valuesBehaviorsController');

router.get('/', valuesBehaviors.getList);
router.post('/', valuesBehaviors.add);


module.exports = router;