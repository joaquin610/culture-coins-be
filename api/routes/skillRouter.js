const express = require('express');
const router = express.Router();
const skill = require('../controllers/skillController')
const validateToken = require('../middlewares/validateToken');

router.post('/',validateToken, skill.add)
router.get('/',validateToken, skill.list);
router.delete('/:id',validateToken, skill.delete);
module.exports = router;