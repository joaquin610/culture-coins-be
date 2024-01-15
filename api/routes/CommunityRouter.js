const express = require('express');
const router = express.Router();
const community = require('../controllers/communityController')


router.post('/', community.add)
router.get('/', community.list);
router.delete('/:id', community.delete);
module.exports = router;