const express = require('express');
const router = express.Router();
const auth = require('../dao/auth');
const currency = require('../dao/currency');

router.get('/getLowestRate/:currencyCode', auth.checkAuthentication, currency.getLowestRate);

module.exports = router;
