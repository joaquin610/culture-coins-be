const express = require('express');
const router = express.Router();
const community = require('../controllers/communityController')
const validateToken = require('../middlewares/validateToken');


router.post('/',validateToken, community.add)
router.get('/',validateToken, community.list);
router.delete('/:id',validateToken, community.delete);
module.exports = router;