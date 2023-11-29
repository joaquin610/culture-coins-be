const express = require('express');
const router = express.Router();
const SupportRequest = require('../controllers/supportRequestController')


//router.get('/:id', validateJWT, carts.detail)
router.post('/', SupportRequest.add);
router.get('/request/:id', SupportRequest.getRequestById );
router.get('/requests/:user', SupportRequest.listByUser);
router.put('/edit/:id', SupportRequest.edit);
router.put('/nextState/:id', SupportRequest.changeStatus);
router.delete('/:id', SupportRequest.deleteById);


module.exports = router;