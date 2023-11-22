const express = require('express');
const router = express.Router();
const SupportRequest = require('../controllers/SupportRequest')

//listByUser
//router.get('/:id', validateJWT, carts.detail)
router.post('/', SupportRequest.add)
router.get('/:user/listByUser', SupportRequest.listByUser)

module.exports = router;