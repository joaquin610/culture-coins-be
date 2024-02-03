const express = require('express');
const router = express.Router();
const Team = require('../controllers/teamController')
const validateToken = require('../middlewares/validateToken');

router.post('/',validateToken, Team.add)
router.get('/',validateToken, Team.list);
router.delete('/:id',validateToken, Team.delete);


module.exports = router;