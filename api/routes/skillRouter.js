const express = require('express');
const router = express.Router();
const skill = require('../controllers/skillController')


router.post('/', skill.add)
router.get('/', skill.list);
router.delete('/:id', skill.delete);
module.exports = router;