const express = require('express');
const router = express.Router();
const currency = require('../dao/currency');

router.get('/getLowestRate/:currencyCode', currency.getLowestRate);

module.exports = router;
