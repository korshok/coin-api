const express = require('express');
const router = express.Router();
const auth = require('../dao/auth');
const currency = require('../dao/currency');

// TODO properly stub auth -
// express load order prevents a standard sinon stub from doing the job
auth.checkAuthentication = process.env.NODE_ENV === 'test' ?
  (req, res, next) => next()
  : auth.checkAuthentication;

router.get(
  '/getLowestRate/:currencyCode',
  auth.checkAuthentication,
  currency.getLowestRate
);

module.exports = router;
