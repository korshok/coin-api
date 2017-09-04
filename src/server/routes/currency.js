const express = require('express');
const router = express.Router();
const auth = require('../dao/auth');
const currency = require('../dao/currency');

auth.checkAuthentication = process.env.NODE_ENV === 'test' ?
  (req, res, next) => next()
  : auth.checkAuthentication;

router.get(
  '/getLowestRate/:currencyCode',
  auth.checkAuthentication,
  currency.getLowestRate
);

module.exports = router;
