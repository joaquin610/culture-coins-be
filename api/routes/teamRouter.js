const express = require('express');
const router = express.Router();
const Team = require('../controllers/teamController')


router.post('/', Team.add)
router.get('/', Team.list);
router.delete('/:id', Team.delete);


module.exports = router;