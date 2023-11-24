const express = require('express');
const router = express.Router();
const SupportRequest = require('../controllers/supportRequestController')

//listByUser
//router.get('/:id', validateJWT, carts.detail)
router.post('/', SupportRequest.add)
router.get('/:user', SupportRequest.listByUser)
router.put('/edit/:id', SupportRequest.edit);

module.exports = router;