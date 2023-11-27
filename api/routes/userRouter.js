const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');

router.post('/', user.add);
//router.post('/notifySupports', user.notifySupports);
router.get('/:email', user.getUserByEmail);
//router.get('/', user.listSupports);

module.exports = router;