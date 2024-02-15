const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');
const validateToken = require('../middlewares/validateToken');
const generateToken = require('../middlewares/generateToken');

router.post('/',validateToken, user.add);
router.post('/auth/register', user.register);
router.post('/auth/login', generateToken, user.login);
//router.post('/notifySupports',validateToken, user.notifySupports);
router.get('/list',validateToken, user.getListUsers);
router.get('/',validateToken, user.getUserByEmail);


router.put('/:email',validateToken, user.updateUser);
//router.get('/',validateToken, user.listSupports);

module.exports = router;