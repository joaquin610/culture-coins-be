const express = require('express');
const router = express.Router();
const SupportRequest = require('../controllers/supportRequestController')
const validateToken = require('../middlewares/validateToken');

//router.get('/:id', validateJWT, carts.detail)
router.post('/',validateToken, SupportRequest.add);
router.get('/request/:id',validateToken, SupportRequest.getRequestById );
router.get('/requests/:user',validateToken, SupportRequest.listByUser);
router.put('/edit/:id',validateToken, SupportRequest.edit);
router.put('/nextState/:id',validateToken, SupportRequest.changeStatus);
router.delete('/:id',validateToken, SupportRequest.deleteById);


module.exports = router;